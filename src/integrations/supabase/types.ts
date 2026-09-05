export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      affiliate_clicks: {
        Row: {
          affiliate_id: string
          converted: boolean | null
          created_at: string | null
          id: string
          ip_address: string | null
          referral_code: string
          service_url: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_id: string
          converted?: boolean | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          referral_code: string
          service_url?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_id?: string
          converted?: boolean | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          referral_code?: string
          service_url?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_links: Json | null
          commission_rate: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          pending_earnings: number | null
          referral_code: string
          total_clicks: number | null
          total_conversions: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          affiliate_links?: Json | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pending_earnings?: number | null
          referral_code: string
          total_clicks?: number | null
          total_conversions?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          affiliate_links?: Json | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pending_earnings?: number | null
          referral_code?: string
          total_clicks?: number | null
          total_conversions?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_prompts: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          template: string
          title: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          template: string
          title: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          template?: string
          title?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      ai_usage: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: string
          input_text: string
          output_text: string | null
          prompt_id: string | null
          saved_as_document: boolean | null
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          input_text: string
          output_text?: string | null
          prompt_id?: string | null
          saved_as_document?: boolean | null
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          input_text?: string
          output_text?: string | null
          prompt_id?: string | null
          saved_as_document?: boolean | null
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "ai_prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          admin_notes: string | null
          business_address: string | null
          company_name: string
          company_type: string | null
          completed_at: string | null
          compliance_data: Json | null
          country_code: Database["public"]["Enums"]["country_code"] | null
          created_at: string | null
          ein_number: string | null
          entity_type: Database["public"]["Enums"]["entity_type"] | null
          formation_date: string | null
          formation_status: Database["public"]["Enums"]["company_status"] | null
          id: string
          jurisdiction: string
          owners: Json | null
          registered_agent: string | null
          shares_structure: Json | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          business_address?: string | null
          company_name: string
          company_type?: string | null
          completed_at?: string | null
          compliance_data?: Json | null
          country_code?: Database["public"]["Enums"]["country_code"] | null
          created_at?: string | null
          ein_number?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          formation_date?: string | null
          formation_status?:
            | Database["public"]["Enums"]["company_status"]
            | null
          id?: string
          jurisdiction: string
          owners?: Json | null
          registered_agent?: string | null
          shares_structure?: Json | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          business_address?: string | null
          company_name?: string
          company_type?: string | null
          completed_at?: string | null
          compliance_data?: Json | null
          country_code?: Database["public"]["Enums"]["country_code"] | null
          created_at?: string | null
          ein_number?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          formation_date?: string | null
          formation_status?:
            | Database["public"]["Enums"]["company_status"]
            | null
          id?: string
          jurisdiction?: string
          owners?: Json | null
          registered_agent?: string | null
          shares_structure?: Json | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          company_id: string | null
          created_at: string | null
          document_type: string
          file_size: number | null
          file_url: string
          id: string
          is_ai_generated: boolean | null
          metadata: Json | null
          mime_type: string | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          document_type: string
          file_size?: number | null
          file_url: string
          id?: string
          is_ai_generated?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          document_type?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_ai_generated?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_favorites: {
        Row: {
          created_at: string
          domain_name: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          domain_name: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          domain_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      domain_inquiries: {
        Row: {
          created_at: string
          domain_name: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain_name: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain_name?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          company_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          order_type: string
          service_id: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          order_type: string
          service_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          order_type?: string
          service_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          customer_data: Json | null
          id: string
          kashier_order_id: string | null
          kashier_transaction_id: string | null
          order_id: string
          payment_method: string
          payment_url: string | null
          plan_id: string | null
          status: string
          updated_at: string | null
          user_id: string
          webhook_data: Json | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          customer_data?: Json | null
          id?: string
          kashier_order_id?: string | null
          kashier_transaction_id?: string | null
          order_id: string
          payment_method?: string
          payment_url?: string | null
          plan_id?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
          webhook_data?: Json | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          customer_data?: Json | null
          id?: string
          kashier_order_id?: string | null
          kashier_transaction_id?: string | null
          order_id?: string
          payment_method?: string
          payment_url?: string | null
          plan_id?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
          webhook_data?: Json | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          order_id: string
          provider: string
          provider_transaction_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          order_id: string
          provider: string
          provider_transaction_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string
          provider?: string
          provider_transaction_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          affiliate_id: string
          commission_amount: number | null
          created_at: string | null
          id: string
          order_id: string | null
          paid_at: string | null
          referred_user_id: string
          status: string | null
        }
        Insert: {
          affiliate_id: string
          commission_amount?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          paid_at?: string | null
          referred_user_id: string
          status?: string | null
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          paid_at?: string | null
          referred_user_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_inquiries: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          jurisdiction: string | null
          last_name: string | null
          message: string
          package: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          jurisdiction?: string | null
          last_name?: string | null
          message: string
          package?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          jurisdiction?: string | null
          last_name?: string | null
          message?: string
          package?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_catalog: {
        Row: {
          category: string
          country_code: Database["public"]["Enums"]["country_code"] | null
          created_at: string | null
          currency: string | null
          description: string | null
          display_order: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          is_addon: boolean | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          category: string
          country_code?: Database["public"]["Enums"]["country_code"] | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_addon?: boolean | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          country_code?: Database["public"]["Enums"]["country_code"] | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_addon?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          company_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          price: number
          purchased_at: string | null
          service_name: string
          service_type: string
          status: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          price: number
          purchased_at?: string | null
          service_name: string
          service_type: string
          status?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          price?: number
          purchased_at?: string | null
          service_name?: string
          service_type?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          priority: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          created_at: string | null
          id: string
          is_internal: boolean | null
          message: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      company_status:
        | "draft"
        | "submitted"
        | "in_progress"
        | "pending_documents"
        | "completed"
        | "rejected"
      country_code:
        | "usa"
        | "uk"
        | "germany"
        | "netherlands"
        | "spain"
        | "france"
      entity_type:
        | "llc"
        | "c_corp"
        | "s_corp"
        | "ltd"
        | "llp"
        | "gmbh"
        | "bv"
        | "sl"
        | "sarl"
        | "sas"
      order_status:
        | "pending"
        | "paid"
        | "processing"
        | "completed"
        | "cancelled"
        | "refunded"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      ticket_status:
        | "open"
        | "in_progress"
        | "waiting_customer"
        | "resolved"
        | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      company_status: [
        "draft",
        "submitted",
        "in_progress",
        "pending_documents",
        "completed",
        "rejected",
      ],
      country_code: ["usa", "uk", "germany", "netherlands", "spain", "france"],
      entity_type: [
        "llc",
        "c_corp",
        "s_corp",
        "ltd",
        "llp",
        "gmbh",
        "bv",
        "sl",
        "sarl",
        "sas",
      ],
      order_status: [
        "pending",
        "paid",
        "processing",
        "completed",
        "cancelled",
        "refunded",
      ],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
      ],
      ticket_status: [
        "open",
        "in_progress",
        "waiting_customer",
        "resolved",
        "closed",
      ],
    },
  },
} as const
