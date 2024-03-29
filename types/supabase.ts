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
      account_balances: {
        Row: {
          account_id: number
          balance: number
          currency: Database["public"]["Enums"]["currency"]
          id: number
        }
        Insert: {
          account_id: number
          balance: number
          currency: Database["public"]["Enums"]["currency"]
          id?: number
        }
        Update: {
          account_id?: number
          balance?: number
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "account_balances_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      account_deposits: {
        Row: {
          account_id: number
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency"]
          id: number
          notes: string | null
          type: Database["public"]["Enums"]["account_deposit_type"]
        }
        Insert: {
          account_id: number
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency"]
          id?: number
          notes?: string | null
          type: Database["public"]["Enums"]["account_deposit_type"]
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
          notes?: string | null
          type?: Database["public"]["Enums"]["account_deposit_type"]
        }
        Relationships: [
          {
            foreignKeyName: "account_deposits_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      account_transfers: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency"]
          from: number | null
          id: number
          to: number | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency"]
          from?: number | null
          id?: number
          to?: number | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          from?: number | null
          id?: number
          to?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "account_transfers_from_fkey"
            columns: ["from"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_transfers_to_fkey"
            columns: ["to"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      accounts: {
        Row: {
          created_at: string
          id: number
          name: string
          notes: string | null
          platform_id: number | null
          transactions: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          notes?: string | null
          platform_id?: number | null
          transactions?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          notes?: string | null
          platform_id?: number | null
          transactions?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      bond_interests: {
        Row: {
          account_id: number
          bond_id: number
          date: string
          fee: number
          id: number
          isReinvested: boolean
          notes: string | null
          quantity: number
          unit_price: number
        }
        Insert: {
          account_id: number
          bond_id: number
          date: string
          fee: number
          id?: number
          isReinvested: boolean
          notes?: string | null
          quantity: number
          unit_price: number
        }
        Update: {
          account_id?: number
          bond_id?: number
          date?: string
          fee?: number
          id?: number
          isReinvested?: boolean
          notes?: string | null
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "bond_interests_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bond_interests_bond_id_fkey"
            columns: ["bond_id"]
            isOneToOne: false
            referencedRelation: "bonds"
            referencedColumns: ["id"]
          }
        ]
      }
      bond_transactions: {
        Row: {
          bond_id: number
          date: string
          fee: number
          id: number
          notes: string | null
          quantity: number
          type: string
          unit_price: number
        }
        Insert: {
          bond_id: number
          date: string
          fee: number
          id?: number
          notes?: string | null
          quantity: number
          type: string
          unit_price: number
        }
        Update: {
          bond_id?: number
          date?: string
          fee?: number
          id?: number
          notes?: string | null
          quantity?: number
          type?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "bond_transactions_bond_id_fkey"
            columns: ["bond_id"]
            isOneToOne: false
            referencedRelation: "bonds"
            referencedColumns: ["id"]
          }
        ]
      }
      bonds: {
        Row: {
          account_id: number
          currency: Database["public"]["Enums"]["currency"]
          id: number
          notes: string | null
          symbol: string
          value: number
        }
        Insert: {
          account_id: number
          currency: Database["public"]["Enums"]["currency"]
          id?: number
          notes?: string | null
          symbol: string
          value: number
        }
        Update: {
          account_id?: number
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
          notes?: string | null
          symbol?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "bonds_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      platforms: {
        Row: {
          icon: string
          id: number
          name: string
          url: string | null
        }
        Insert: {
          icon: string
          id?: number
          name: string
          url?: string | null
        }
        Update: {
          icon?: string
          id?: number
          name?: string
          url?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          default_currency: Database["public"]["Enums"]["currency"]
          id: number
          user_id: string
        }
        Insert: {
          default_currency?: Database["public"]["Enums"]["currency"]
          id?: number
          user_id?: string
        }
        Update: {
          default_currency?: Database["public"]["Enums"]["currency"]
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stock_transactions: {
        Row: {
          date: string
          fee: number
          id: number
          notes: string | null
          quantity: number
          stock_id: number
          type: Database["public"]["Enums"]["transaction_type"]
          unit_price: number
        }
        Insert: {
          date: string
          fee: number
          id?: number
          notes?: string | null
          quantity: number
          stock_id: number
          type?: Database["public"]["Enums"]["transaction_type"]
          unit_price: number
        }
        Update: {
          date?: string
          fee?: number
          id?: number
          notes?: string | null
          quantity?: number
          stock_id?: number
          type?: Database["public"]["Enums"]["transaction_type"]
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_transactions_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          }
        ]
      }
      stocks: {
        Row: {
          account_id: number
          currency: Database["public"]["Enums"]["currency"]
          id: number
          notes: string | null
          purchase_price: number
          quantity: number
          symbol: string
        }
        Insert: {
          account_id: number
          currency: Database["public"]["Enums"]["currency"]
          id?: number
          notes?: string | null
          purchase_price: number
          quantity: number
          symbol: string
        }
        Update: {
          account_id?: number
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
          notes?: string | null
          purchase_price?: number
          quantity?: number
          symbol?: string
        }
        Relationships: [
          {
            foreignKeyName: "stocks_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          account_id: number
          currency: Database["public"]["Enums"]["currency"]
          id: number
        }
        Insert: {
          account_id: number
          currency: Database["public"]["Enums"]["currency"]
          id?: number
        }
        Update: {
          account_id?: number
          currency?: Database["public"]["Enums"]["currency"]
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
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
      account_deposit_type: "withdraw" | "deposit"
      currency: "CZK" | "EUR" | "USD"
      transaction_type: "BUY" | "SELL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

