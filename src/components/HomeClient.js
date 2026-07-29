"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/page.module.css";
import PostCard from "@/components/PostCard";
import Newsletter from "@/components/Newsletter";
import { urlFor } from "@/lib/sanity";

export default function HomeClient({ posts, author }) {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique categories
  const categories = ["الكل", ...new Set(posts.map((post) => post.category))];

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "الكل" || post.category === selectedCategory;
    const matchesSearch =
      post.title.includes(searchQuery) ||
      post.excerpt.includes(searchQuery) ||
      post.category.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>مساحة فكرية هادئة</span>
          <h1 className={styles.heroTitle}> قراءة نقدية لمشاكل المجتمع</h1>
          <p className={styles.heroBio}>
            أهلاً بك. أنا {author.name}، {author.title}.
            {author.bio}
          </p>
          <div className={styles.heroActions}>
            <Link href="/about" className={styles.btnPrimary}>
              اقرأ قصتي الفكرية
            </Link>
            <a href="#articles" className={styles.btnSecondary}>
              تصفح المقالات
            </a>
          </div>
        </div>

        <div className={styles.heroImageContainer}>
          <div className={styles.heroImageWrapper}>
            <img
              src={urlFor(author.avatar) || "/images/AhmedFawzy.jpeg"}
              alt={author.name}
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section id="articles" className={styles.filterSection}>
        <div className={styles.filterControls}>
          {/* Categories */}
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.filterBtn} ${selectedCategory === category ? styles.filterBtnActive : ""
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="ابحث عن مقال أو فكرة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.value || e.target.value)}
              className={styles.searchInput}
              aria-label="البحث في المقالات"
            />
            {/* Search Icon */}
            <svg
              className={styles.searchIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className={styles.postsGrid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className={styles.noResults}>
            <h3>عذراً، لم نجد أي مقالات تطابق معايير بحثك.</h3>
            <p>حاول استخدام كلمات مفتاحية أخرى أو تصفح التصنيفات العامة.</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
