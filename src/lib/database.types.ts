export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Product: {
        Row: {
          id: string
          name: string
          slug: string
          brand: string
          category: string | null
          description: string | null
          price: number
          metaTags: string | null
          metaTitle: string | null
          metaDescription: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          brand: string
          category?: string | null
          description?: string | null
          price: number
          metaTags?: string | null
          metaTitle?: string | null
          metaDescription?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          brand?: string
          category?: string | null
          description?: string | null
          price?: number
          metaTags?: string | null
          metaTitle?: string | null
          metaDescription?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Relationships: []
      }
      ProductImage: {
        Row: {
          id: string
          url: string
          productId: string
          createdAt: string
        }
        Insert: {
          id?: string
          url: string
          productId: string
          createdAt?: string
        }
        Update: {
          id?: string
          url?: string
          productId?: string
          createdAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProductImage_productId_fkey"
            columns: ["productId"]
            referencedRelation: "Product"
            referencedColumns: ["id"]
          }
        ]
      }
      Tag: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      _ProductToTag: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_ProductToTag_A_fkey"
            columns: ["A"]
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_ProductToTag_B_fkey"
            columns: ["B"]
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
