"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, Search, ExternalLink, Copy, Check, Image as ImageIcon, Globe, Twitter, Upload, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Helper for character count color coding
function getCharCountColor(count: number, min: number, optimalMin: number, max: number): string {
  if (count < min || count > max) {
    return "text-red-500";
  }
  if (count >= optimalMin && count <= max) {
    return "text-green-500";
  }
  return "text-yellow-500"; // Between min and optimalMin
}

interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

interface SeoData {
  defaults: {
    siteName: string;
    siteUrl: string;
    defaultImage: string;
    twitterHandle: string;
    locale: string;
  };
  pages: Record<string, PageSeoConfig>;
}

export default function SeoAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>("/");
  const [editedConfig, setEditedConfig] = useState<PageSeoConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if already authenticated via server
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/admin/auth");
      const data = await response.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadSeoData();
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    }
    setCheckingAuth(false);
  };

  const loadSeoData = async () => {
    try {
      const response = await fetch("/api/admin/seo");
      if (response.ok) {
        const data = await response.json();
        setSeoData(data);
        if (data.pages["/"]) {
          setEditedConfig(data.pages["/"]);
        }
      }
    } catch (err) {
      console.error("Failed to load SEO data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        loadSeoData();
      } else {
        setError(data.error || "Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }

    setLoggingIn(false);
  };

  const handleSelectPage = (path: string) => {
    setSelectedPage(path);
    if (seoData?.pages[path]) {
      setEditedConfig({ ...seoData.pages[path] });
    } else {
      setEditedConfig({
        title: "",
        description: "",
        keywords: [],
      });
    }
  };

  const handleSave = async () => {
    if (!editedConfig || !seoData) return;

    setSaving(true);
    try {
      const updatedData = {
        ...seoData,
        pages: {
          ...seoData.pages,
          [selectedPage]: editedConfig,
        },
      };

      const response = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setSeoData(updatedData);
        toast.success("Changes saved", {
          description: `SEO metadata updated for ${selectedPage === "/" ? "Home" : selectedPage}`,
        });
      } else {
        toast.error("Failed to save changes");
      }
    } catch (err) {
      console.error("Failed to save:", err);
      toast.error("Failed to save changes");
    }
    setSaving(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/admin/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagePath: selectedPage }),
      });

      const data = await response.json();

      if (response.ok && data.title && data.description) {
        setEditedConfig((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          keywords: data.keywords || prev?.keywords || [],
        }));
        toast.success("Generated SEO metadata", {
          description: "Review and save the changes",
        });
      } else {
        toast.error(data.error || "Failed to generate metadata");
      }
    } catch (err) {
      console.error("Generate error:", err);
      toast.error("Failed to generate metadata");
    }
    setGenerating(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pagePath", selectedPage);

      const response = await fetch("/api/admin/upload-og", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.path) {
        setEditedConfig((prev) =>
          prev ? { ...prev, image: data.path } : null
        );
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    }
    setUploading(false);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredPages = seoData
    ? Object.keys(seoData.pages).filter((path) =>
        path.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>SEO Admin</CardTitle>
            <CardDescription>Enter password to access SEO settings</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "border-destructive" : ""}
                  disabled={loggingIn}
                />
                {error && <p className="text-sm text-destructive mt-1">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loggingIn}>
                {loggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">SEO Admin</h1>
            <p className="text-sm text-muted-foreground">Manage page metadata and OG tags</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Page List */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3 shrink-0">
              <CardTitle className="text-base">Pages</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 min-h-0">
              <div className="h-full overflow-y-auto overscroll-contain" data-lenis-prevent>
                {filteredPages.map((path) => (
                  <button
                    key={path}
                    onClick={() => handleSelectPage(path)}
                    className={`w-full text-left px-4 py-2 text-sm border-b last:border-0 hover:bg-muted/50 transition-colors ${
                      selectedPage === path ? "bg-muted" : ""
                    }`}
                  >
                    <span className="font-mono text-xs">{path === "/" ? "Home" : path}</span>
                    <p className="text-muted-foreground truncate text-xs mt-0.5">
                      {seoData?.pages[path]?.title}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-mono">{selectedPage === "/" ? "Home" : selectedPage}</CardTitle>
                  <CardDescription>Edit SEO metadata for this page</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `${seoData?.defaults.siteUrl}${selectedPage === "/" ? "" : selectedPage}`,
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    {generating ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-1" />
                    )}
                    Generate
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={editedConfig?.title || ""}
                  onChange={(e) =>
                    setEditedConfig((prev) => (prev ? { ...prev, title: e.target.value } : null))
                  }
                  placeholder="Page title"
                />
                <p className={`text-xs mt-1 ${getCharCountColor(editedConfig?.title?.length || 0, 30, 50, 60)}`}>
                  {(editedConfig?.title?.length || 0)}/60 characters
                  {(editedConfig?.title?.length || 0) < 30 && " (too short)"}
                  {(editedConfig?.title?.length || 0) > 60 && " (too long)"}
                  {(editedConfig?.title?.length || 0) >= 30 && (editedConfig?.title?.length || 0) <= 60 && " (optimal)"}
                </p>
              </div>

              <div>
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  value={editedConfig?.description || ""}
                  onChange={(e) =>
                    setEditedConfig((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Page description"
                  rows={3}
                />
                <p className={`text-xs mt-1 ${getCharCountColor(editedConfig?.description?.length || 0, 70, 120, 160)}`}>
                  {(editedConfig?.description?.length || 0)}/160 characters
                  {(editedConfig?.description?.length || 0) < 70 && " (too short)"}
                  {(editedConfig?.description?.length || 0) > 160 && " (too long)"}
                  {(editedConfig?.description?.length || 0) >= 70 && (editedConfig?.description?.length || 0) <= 160 && " (optimal)"}
                </p>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  value={editedConfig?.keywords?.join(", ") || ""}
                  onChange={(e) =>
                    setEditedConfig((prev) =>
                      prev
                        ? {
                            ...prev,
                            keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                          }
                        : null
                    )
                  }
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div>
                <Label htmlFor="image">OG Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={editedConfig?.image || ""}
                    onChange={(e) =>
                      setEditedConfig((prev) =>
                        prev ? { ...prev, image: e.target.value } : null
                      )
                    }
                    placeholder="/images/og/page-name.png"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {editedConfig?.image && (
                  <div className="mt-2 relative rounded-lg overflow-hidden border bg-muted aspect-[1200/630] w-full max-w-xs">
                    <img
                      src={editedConfig.image}
                      alt="OG Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {editedConfig?.image ? "Custom image set" : `Using default: ${seoData?.defaults.defaultImage}`}
                </p>
              </div>

              <Separator />

              {/* Preview Section */}
              <div>
                <h3 className="text-sm font-medium mb-3">Social Preview</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Google Preview */}
                  <div className="border rounded-lg p-3 bg-white dark:bg-zinc-900">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Google</span>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer truncate">
                      {editedConfig?.title} | Sourceful Energy
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-500 truncate">
                      {seoData?.defaults.siteUrl}
                      {selectedPage === "/" ? "" : selectedPage}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {editedConfig?.description}
                    </p>
                  </div>

                  {/* Twitter Preview */}
                  <div className="border rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
                    <div className="flex items-center gap-2 p-2 border-b">
                      <Twitter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Twitter/X</span>
                    </div>
                    <div className="aspect-[2/1] bg-muted flex items-center justify-center overflow-hidden">
                      {(editedConfig?.image || seoData?.defaults.defaultImage) ? (
                        <img
                          src={editedConfig?.image || seoData?.defaults.defaultImage}
                          alt="OG Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{editedConfig?.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {editedConfig?.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        sourceful.energy
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Generated Tags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Generated Meta Tags</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const tags = generateMetaTags(selectedPage, editedConfig, seoData?.defaults);
                      copyToClipboard(tags);
                    }}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                  {generateMetaTags(selectedPage, editedConfig, seoData?.defaults)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{Object.keys(seoData?.pages || {}).length}</div>
              <p className="text-sm text-muted-foreground">Pages Configured</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {Object.values(seoData?.pages || {}).filter((p) => p.image).length}
              </div>
              <p className="text-sm text-muted-foreground">Custom OG Images</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {Object.values(seoData?.pages || {}).filter((p) => (p.title?.length || 0) > 50).length}
              </div>
              <p className="text-sm text-muted-foreground">Long Titles (50+)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {Object.values(seoData?.pages || {}).filter((p) => !p.description).length}
              </div>
              <p className="text-sm text-muted-foreground">Missing Descriptions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function generateMetaTags(
  path: string,
  config: PageSeoConfig | null,
  defaults?: SeoData["defaults"]
): string {
  if (!config || !defaults) return "";

  const url = `${defaults.siteUrl}${path === "/" ? "" : path}`;
  const imageUrl = config.image
    ? `${defaults.siteUrl}${config.image}`
    : `${defaults.siteUrl}${defaults.defaultImage}`;

  return `<title>${config.title} | ${defaults.siteName}</title>
<meta name="description" content="${config.description}" />
<meta name="keywords" content="${config.keywords?.join(", ") || ""}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${config.title}" />
<meta property="og:description" content="${config.description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${defaults.siteName}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${config.title}" />
<meta name="twitter:description" content="${config.description}" />
<meta name="twitter:image" content="${imageUrl}" />
<meta name="twitter:creator" content="${defaults.twitterHandle}" />`;
}
