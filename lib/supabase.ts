import { createClient } from '@supabase/supabase-js'
import type {
  CommitteeMember, Donor, TemplePlace, PlaceImage,
  GalleryCategory, GalleryImage, Event, EventPhoto,
  TempleOfficial, SiteSetting, NewsUpdate
} from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// Data Fetching Functions
// ============================================

// Committee Members (දායක සභාව)
export async function getCommitteeMembers(): Promise<CommitteeMember[]> {
  const { data, error } = await supabase
    .from('committee_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) { console.error('Error fetching committee members:', error); return []; }
  return data || [];
}

// Donors (දායකයින්)
export async function getDonors(): Promise<Donor[]> {
  const { data, error } = await supabase
    .from('donors')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) { console.error('Error fetching donors:', error); return []; }
  return data || [];
}

// Temple Places (විහාරස්ථානයේ ස්ථාන)
export async function getTemplePlaces(): Promise<TemplePlace[]> {
  const { data, error } = await supabase
    .from('temple_places')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) { console.error('Error fetching temple places:', error); return []; }
  return data || [];
}

export async function getTemplePlaceBySlug(slug: string): Promise<TemplePlace | null> {
  const { data, error } = await supabase
    .from('temple_places')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) { console.error('Error fetching temple place:', error); return null; }
  return data;
}

// Place Images
export async function getPlaceImages(placeId: string): Promise<PlaceImage[]> {
  const { data, error } = await supabase
    .from('place_images')
    .select('*')
    .eq('place_id', placeId)
    .order('display_order')
  if (error) { console.error('Error fetching place images:', error); return []; }
  return data || [];
}

// Gallery Categories (ගැලරි කාණ්ඩ)
export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const { data, error } = await supabase
    .from('gallery_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) { console.error('Error fetching gallery categories:', error); return []; }
  return data || [];
}

// Gallery Images
export async function getGalleryImages(categoryId: string): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('category_id', categoryId)
    .order('display_order')
  if (error) { console.error('Error fetching gallery images:', error); return []; }
  return data || [];
}

export async function getAllGalleryImages(): Promise<(GalleryImage & { category: GalleryCategory })[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*, category:gallery_categories(*)')
    .order('display_order')
  if (error) { console.error('Error fetching all gallery images:', error); return []; }
  return data || [];
}

// Events (උත්සව)
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) { console.error('Error fetching events:', error); return []; }
  return data || [];
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('display_order')
  if (error) { console.error('Error fetching featured events:', error); return []; }
  return data || [];
}

// Event Photos
export async function getEventPhotos(eventId: string): Promise<EventPhoto[]> {
  const { data, error } = await supabase
    .from('event_photos')
    .select('*')
    .eq('event_id', eventId)
    .order('display_order')
  if (error) { console.error('Error fetching event photos:', error); return []; }
  return data || [];
}

// Temple Officials (විහාර අධිකාරී)
export async function getTempleOfficials(): Promise<TempleOfficial[]> {
  const { data, error } = await supabase
    .from('temple_officials')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) { console.error('Error fetching temple officials:', error); return []; }
  return data || [];
}

// Site Settings (අඩවි සැකසුම්)
export async function getSiteSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()
  if (error) { console.error('Error fetching site setting:', error); return null; }
  return data?.value || null;
}

export async function getAllSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
  if (error) { console.error('Error fetching site settings:', error); return {}; }
  const settings: Record<string, string> = {};
  (data || []).forEach(s => { if (s.value) settings[s.key] = s.value; });
  return settings;
}

// News Updates (නවතම යාවත්කාලීන)
export async function getNewsUpdates(limit = 10): Promise<NewsUpdate[]> {
  const { data, error } = await supabase
    .from('news_updates')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) { console.error('Error fetching news updates:', error); return []; }
  return data || [];
}

// ============================================
// Storage Helpers
// ============================================

export async function uploadImage(
  file: File,
  folder: string = 'general'
): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
  
  const { error } = await supabase.storage
    .from('temple-images')
    .upload(fileName, file, { contentType: file.type });
    
  if (error) { console.error('Error uploading image:', error); return null; }
  
  const { data: urlData } = supabase.storage
    .from('temple-images')
    .getPublicUrl(fileName);
    
  return urlData.publicUrl;
}

export async function deleteImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from('temple-images')
    .remove([path]);
  if (error) { console.error('Error deleting image:', error); return false; }
  return true;
}

export function getImageUrl(path: string): string {
  const { data } = supabase.storage
    .from('temple-images')
    .getPublicUrl(path);
  return data.publicUrl;
}
