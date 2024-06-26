export interface Recipient {
  id: string
  nome?: string
  avatar?: string
  descricao?: string
}

export interface RecipientGroup {
  id?: string
  nome?: string
  foto?: string
  descricao?: string
  proprietarioId?: string
  token?: string
  audios?: []
  cargos?: []
  createdAt?: string
  enquetes?: []
  imagens?: []
  mensagens?: []
  updatedAt?: string
  usuarios?: {
    adicionadoPor?: string
    entrouEm?: string
    grupoId?: string | string[]
    usuarioId?: string
  }[]
  videos?: []
}
