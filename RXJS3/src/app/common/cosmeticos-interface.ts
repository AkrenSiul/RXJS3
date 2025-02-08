export interface CosmeticosInterface {
  cosmeticos: Cosmeticos
}

export interface Cosmeticos {
  info: Info
  cosmeticos: Cosmetico[]
}

export interface Info {
  total: number
  pages: number
}

export interface Cosmetico {
  _id: string
  name: string
  image: string
  type: string
  brand: string
  price: number
}
