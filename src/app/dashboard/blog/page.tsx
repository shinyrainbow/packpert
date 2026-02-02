"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  FileText,
  Upload,
  X,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import Link from "next/link";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface BlogSection {
  id?: string;
  imageUrl: string;
  imagePosition: "left" | "right";
  content: string;
  contentEn: string;
}

interface Blog {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  excerpt: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  sections: BlogSection[];
  catalogType: string | null;
}

const CATALOG_TYPES = [
  { value: "", label: "ไม่เลือก" },
  { value: "creamTube", label: "หลอดครีม" },
  { value: "stickTube", label: "หลอดสติ๊ก" },
  { value: "bottle", label: "ขวดพลาสติก" },
  { value: "jar", label: "กระปุก" },
  { value: "serumBottle", label: "ขวดเซรั่ม" },
  { value: "lip", label: "ลิป" },
  { value: "cosmetics", label: "ตลับแป้ง" },
];

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const sectionImageInputRef = useRef<HTMLInputElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const { confirm } = useConfirmDialog();
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    slug: "",
    excerpt: "",
    excerptEn: "",
    coverImage: "",
    isPublished: false,
    categoryId: "",
    catalogType: "",
    sections: [] as BlogSection[],
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9ก-๙]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "section"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadKey = type === "cover" ? "cover" : `section-${currentSectionIndex}`;
    setUploading(uploadKey);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();

      if (data.success) {
        if (type === "cover") {
          setFormData({ ...formData, coverImage: data.data.url });
        } else if (currentSectionIndex !== null) {
          const newSections = [...formData.sections];
          newSections[currentSectionIndex].imageUrl = data.data.url;
          setFormData({ ...formData, sections: newSections });
        }
        toast.success("อัปโหลดรูปภาพสำเร็จ");
      } else {
        toast.error(data.error || "อัปโหลดไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(null);
      if (sectionImageInputRef.current) {
        sectionImageInputRef.current.value = "";
      }
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug) {
      toast.error("กรุณากรอกหัวข้อและ slug");
      return;
    }

    setUpdating("form");
    try {
      const url = editingBlog
        ? `/api/admin/blog/${editingBlog.id}`
        : "/api/admin/blog";
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(editingBlog ? "บันทึกการแก้ไขสำเร็จ" : "สร้างบทความสำเร็จ");
        fetchBlogs();
        handleCloseModal();
      } else {
        toast.error(data.error || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "ยืนยันการลบ",
      message: "คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?",
      confirmText: "ลบ",
      cancelText: "ยกเลิก",
      variant: "danger",
    });
    if (!confirmed) return;

    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("ลบบทความสำเร็จ");
        fetchBlogs();
      } else {
        toast.error("เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setUpdating(null);
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    setUpdating(blog.id);
    try {
      const res = await fetch(`/api/admin/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          isPublished: !blog.isPublished,
        }),
      });

      if (res.ok) {
        toast.success(blog.isPublished ? "ซ่อนบทความแล้ว" : "เผยแพร่บทความแล้ว");
        fetchBlogs();
      }
    } catch (error) {
      console.error("Failed to toggle publish:", error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setUpdating(null);
    }
  };

  const handleOpenModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        titleEn: blog.titleEn || "",
        slug: blog.slug,
        excerpt: blog.excerpt || "",
        excerptEn: blog.excerptEn || "",
        coverImage: blog.coverImage || "",
        isPublished: blog.isPublished,
        categoryId: "",
        catalogType: blog.catalogType || "",
        sections: blog.sections.map((s) => ({
          imageUrl: s.imageUrl || "",
          imagePosition: (s.imagePosition as "left" | "right") || "left",
          content: s.content || "",
          contentEn: s.contentEn || "",
        })),
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        titleEn: "",
        slug: "",
        excerpt: "",
        excerptEn: "",
        coverImage: "",
        isPublished: false,
        categoryId: "",
        catalogType: "",
        sections: [
          {
            imageUrl: "",
            imagePosition: "left",
            content: "",
            contentEn: "",
          },
        ],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      titleEn: "",
      slug: "",
      excerpt: "",
      excerptEn: "",
      coverImage: "",
      isPublished: false,
      categoryId: "",
      catalogType: "",
      sections: [],
    });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          imageUrl: "",
          imagePosition: "left",
          content: "",
          contentEn: "",
        },
      ],
    });
  };

  const removeSection = (index: number) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const updateSection = useCallback(
    (index: number, field: keyof BlogSection, value: string) => {
      setFormData((prev) => {
        // Only update if value actually changed to prevent infinite loops
        if (prev.sections[index]?.[field] === value) {
          return prev;
        }
        const newSections = [...prev.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        return { ...prev, sections: newSections };
      });
    },
    []
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-64 animate-pulse bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการบล็อก</h1>
          <p className="text-gray-600 mt-1">สร้างและจัดการบทความบล็อก</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-[#C9A227] hover:bg-[#A88B1F] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          สร้างบทความใหม่
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">บทความทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">เผยแพร่แล้ว</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogs.filter((b) => b.isPublished).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">แบบร่าง</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogs.filter((b) => !b.isPublished).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Blog Table */}
      {blogs.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">ยังไม่มีบทความ</p>
          <Button
            onClick={() => handleOpenModal()}
            className="bg-[#C9A227] hover:bg-[#A88B1F] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            สร้างบทความแรก
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    หัวข้อ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ส่วนเนื้อหา
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    วันที่สร้าง
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      !blog.isPublished ? "bg-gray-50/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 line-clamp-1">
                          {blog.title}
                        </span>
                        {blog.excerpt && (
                          <span className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {blog.excerpt}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {blog.slug}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          blog.isPublished
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {blog.isPublished ? "เผยแพร่แล้ว" : "แบบร่าง"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-gray-600">
                        {blog.sections.length}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(blog.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {blog.isPublished && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-[#C9A227] hover:bg-[#C9A227]/10 rounded-lg transition-colors"
                            title="ดูบทความ"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(blog)}
                          disabled={updating === blog.id}
                          className={`p-2 ${
                            blog.isPublished
                              ? "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50"
                          }`}
                          title={blog.isPublished ? "ซ่อน" : "เผยแพร่"}
                        >
                          {updating === blog.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : blog.isPublished ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenModal(blog)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          title="แก้ไข"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                          disabled={updating === blog.id}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl p-6 bg-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBlog ? "แก้ไขบทความ" : "สร้างบทความใหม่"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หัวข้อ (ภาษาไทย) *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setFormData({
                        ...formData,
                        title: newTitle,
                        slug: formData.slug || generateSlug(newTitle),
                      });
                    }}
                    placeholder="หัวข้อบทความ"
                    className="text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug (URL) *
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="url-friendly-slug"
                    className="text-gray-900"
                  />
                </div>
              </div>

              {/* English Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หัวข้อ (English)
                </label>
                <Input
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  placeholder="Blog title"
                  className="text-gray-900"
                />
              </div>

              {/* Excerpt Thai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตัวอย่างเนื้อหา (ภาษาไทย)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="คำอธิบายสั้นๆ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent text-gray-900"
                />
              </div>

              {/* Excerpt English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตัวอย่างเนื้อหา (ภาษาอังกฤษ)
                </label>
                <textarea
                  value={formData.excerptEn}
                  onChange={(e) =>
                    setFormData({ ...formData, excerptEn: e.target.value })
                  }
                  placeholder="Short description in English..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent text-gray-900"
                />
              </div>

              {/* Catalog Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ประเภทสินค้าที่เกี่ยวข้อง (Catalog Type)
                </label>
                <select
                  value={formData.catalogType}
                  onChange={(e) =>
                    setFormData({ ...formData, catalogType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent text-gray-900 bg-white"
                >
                  {CATALOG_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  เลือกประเภทสินค้าเพื่อแสดงสินค้าที่เกี่ยวข้องในหน้าบทความ
                </p>
              </div>

              {/* Content Sections */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    เนื้อหาบทความ (รูปภาพ + เนื้อหา)
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSection}
                    className="text-[#C9A227] border-[#C9A227] hover:bg-[#C9A227]/10"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    เพิ่มส่วนเนื้อหา
                  </Button>
                </div>

                <div className="space-y-6">
                  {formData.sections.map((section, index) => (
                    <Card key={index} className="p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          ส่วนที่ {index + 1}
                        </span>
                        {formData.sections.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            ลบ
                          </Button>
                        )}
                      </div>

                      {/* Section Image */}
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          รูปภาพ (ไม่บังคับ)
                        </label>
                        {section.imageUrl ? (
                          <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={section.imageUrl}
                              alt={`Section ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => updateSection(index, "imageUrl", "")}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setCurrentSectionIndex(index);
                              sectionImageInputRef.current?.click();
                            }}
                            className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#C9A227] hover:bg-[#C9A227]/5 transition-colors"
                          >
                            {uploading === `section-${index}` ? (
                              <Loader2 className="w-6 h-6 text-[#C9A227] animate-spin mx-auto" />
                            ) : (
                              <>
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                <p className="text-xs text-gray-600">อัปโหลดรูป</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Image Position - Visual Preview */}
                      {section.imageUrl && (
                        <div className="mb-4">
                          <label className="block text-xs font-medium text-gray-600 mb-2">
                            ตำแหน่งรูปภาพ
                          </label>
                          <div className="flex gap-3">
                            {/* Left layout preview */}
                            <button
                              type="button"
                              onClick={() => updateSection(index, "imagePosition", "left")}
                              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                                section.imagePosition === "left"
                                  ? "border-[#C9A227] bg-[#C9A227]/10"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex gap-2 mb-2">
                                <div className={`w-1/2 h-12 rounded flex items-center justify-center text-xs ${
                                  section.imagePosition === "left" ? "bg-[#C9A227] text-white" : "bg-gray-300 text-gray-600"
                                }`}>
                                  รูป
                                </div>
                                <div className="w-1/2 h-12 bg-gray-100 rounded flex items-center justify-center">
                                  <div className="space-y-1">
                                    <div className="w-8 h-1 bg-gray-300 rounded"></div>
                                    <div className="w-6 h-1 bg-gray-300 rounded"></div>
                                  </div>
                                </div>
                              </div>
                              <span className={`text-xs ${section.imagePosition === "left" ? "text-[#C9A227] font-medium" : "text-gray-500"}`}>
                                รูปซ้าย - เนื้อหาขวา
                              </span>
                            </button>

                            {/* Right layout preview */}
                            <button
                              type="button"
                              onClick={() => updateSection(index, "imagePosition", "right")}
                              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                                section.imagePosition === "right"
                                  ? "border-[#C9A227] bg-[#C9A227]/10"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex gap-2 mb-2">
                                <div className="w-1/2 h-12 bg-gray-100 rounded flex items-center justify-center">
                                  <div className="space-y-1">
                                    <div className="w-8 h-1 bg-gray-300 rounded"></div>
                                    <div className="w-6 h-1 bg-gray-300 rounded"></div>
                                  </div>
                                </div>
                                <div className={`w-1/2 h-12 rounded flex items-center justify-center text-xs ${
                                  section.imagePosition === "right" ? "bg-[#C9A227] text-white" : "bg-gray-300 text-gray-600"
                                }`}>
                                  รูป
                                </div>
                              </div>
                              <span className={`text-xs ${section.imagePosition === "right" ? "text-[#C9A227] font-medium" : "text-gray-500"}`}>
                                รูปขวา - เนื้อหาซ้าย
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Section Content */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            เนื้อหา (ภาษาไทย)
                          </label>
                          <RichTextEditor
                            value={section.content}
                            onChange={(value) =>
                              updateSection(index, "content", value)
                            }
                            placeholder="เนื้อหาส่วนนี้..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Content (English)
                          </label>
                          <RichTextEditor
                            value={section.contentEn}
                            onChange={(value) =>
                              updateSection(index, "contentEn", value)
                            }
                            placeholder="Content in English..."
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <input
                  ref={sectionImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "section")}
                  className="hidden"
                />
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-4 h-4 text-[#C9A227] border-gray-300 rounded focus:ring-[#C9A227]"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">
                  เผยแพร่บทความนี้
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                disabled={updating === "form"}
                className="text-gray-900"
              >
                ยกเลิก
              </Button>
              <Button
                className="bg-[#C9A227] hover:bg-[#A88B1F] text-white"
                onClick={handleSubmit}
                disabled={updating === "form" || !formData.title || !formData.slug}
              >
                {updating === "form" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : editingBlog ? (
                  "บันทึกการแก้ไข"
                ) : (
                  "สร้างบทความ"
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
