// Database types for Harithagiri Viharaya
export interface CommitteeMember {
  id: string
  name: string
  name_si: string | null
  role: string
  role_si: string | null
  phone: string | null
  email: string | null
  image_url: string | null
  category: string | null
  description_si: string | null
  photo: string | null
  initials: string | null
  color: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Donor {
  id: string
  name: string
  name_si: string | null
  contribution: string | null
  amount: number | null
  year: string | null
  phone: string | null
  address: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TemplePlace {
  id: string
  slug: string
  title: string
  title_si: string | null
  short_description: string | null
  short_description_si: string | null
  description: string | null
  description_si: string | null
  sub_heading: string | null
  sub_heading_si: string | null
  cover_image: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PlaceImage {
  id: string
  place_id: string
  image_url: string
  alt_text: string | null
  display_order: number
  created_at: string
}

export interface GalleryCategory {
  id: string
  slug: string
  name: string
  name_si: string | null
  icon: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

export interface GalleryImage {
  id: string
  category_id: string
  image_url: string
  title: string | null
  title_si: string | null
  description: string | null
  display_order: number
  created_at: string
}

export interface Event {
  id: string
  name: string
  name_si: string | null
  date: string | null
  description: string | null
  description_si: string | null
  cover_image: string | null
  youtube_id: string | null
  is_featured: boolean
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface EventPhoto {
  id: string
  event_id: string
  image_url: string
  alt_text: string | null
  display_order: number
  created_at: string
}

export interface TempleOfficial {
  id: string
  name: string
  name_si: string | null
  title: string
  title_si: string | null
  image_url: string | null
  bio: string | null
  bio_si: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  key: string
  value: string | null
  description: string | null
  updated_at: string
}

export interface NewsUpdate {
  id: string
  title: string
  title_si: string | null
  content: string | null
  content_si: string | null
  image_url: string | null
  link: string | null
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}
