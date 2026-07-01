export type TeamCategory = 'all' | 'clinical' | 'child' | 'family' | 'corporate'

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  specialties: string[]
  category: Exclude<TeamCategory, 'all'>
  languages: string[]
  experienceYears: number
  image?: string
  accent: string
}

export const TEAM_CATEGORIES: { id: TeamCategory; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'clinical', label: 'Klinik Psikolog' },
  { id: 'child', label: 'Çocuk & Ergen' },
  { id: 'family', label: 'Aile & İlişki' },
  { id: 'corporate', label: 'Kurumsal' },
]

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ayse-yilmaz',
    name: 'Dr. Ayşe Yılmaz',
    role: 'Klinik Psikolog',
    bio: 'Bireysel ve çift danışmanlığı alanında 10 yılı aşkın deneyim.',
    specialties: ['Bireysel Danışmanlık', 'Çift Danışmanlığı'],
    category: 'clinical',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 12,
    accent: '#5a0202',
  },
  {
    id: 'mehmet-kaya',
    name: 'Uzm. Psk. Mehmet Kaya',
    role: 'Psikolog',
    bio: 'Ergen danışmanlığı ve sınav koçluğu uzmanı.',
    specialties: ['Ergen Danışmanlığı', 'Sınav Koçluğu'],
    category: 'child',
    languages: ['Türkçe'],
    experienceYears: 8,
    accent: '#7a1838',
  },
  {
    id: 'zeynep-demir',
    name: 'Uzm. Psk. Zeynep Demir',
    role: 'Klinik Psikolog',
    bio: 'Oyun danışmanlığı ve çocuk psikolojisi alanında çalışıyor.',
    specialties: ['Oyun Danışmanlığı', 'Dikkat Geliştirme'],
    category: 'child',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 9,
    accent: '#4a2858',
  },
  {
    id: 'can-arslan',
    name: 'Uzm. Psk. Can Arslan',
    role: 'Psikolog',
    bio: 'Online danışmanlık ve bireysel terapi alanında uzman.',
    specialties: ['Online Danışmanlık', 'Bireysel Terapi'],
    category: 'clinical',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 6,
    accent: '#6b3020',
  },
  {
    id: 'elif-ozturk',
    name: 'Uzm. Psk. Elif Öztürk',
    role: 'Klinik Psikolog',
    bio: 'Aile danışmanlığı ve psikolojik değerlendirme uzmanı.',
    specialties: ['Aile Danışmanlığı', 'Psikolojik Testler'],
    category: 'family',
    languages: ['Türkçe'],
    experienceYears: 10,
    accent: '#3d4a6e',
  },
  {
    id: 'burak-sahin',
    name: 'Uzm. Psk. Burak Şahin',
    role: 'Psikolog',
    bio: 'Kurumsal danışmanlık ve stres yönetimi programları.',
    specialties: ['Kurumsal Danışmanlık', 'Stres Yönetimi'],
    category: 'corporate',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 7,
    accent: '#2e4a3a',
  },
  {
    id: 'selin-aksoy',
    name: 'Uzm. Psk. Selin Aksoy',
    role: 'Klinik Psikolog',
    bio: 'Kaygı bozuklukları ve travma sonrası destek alanlarında çalışır.',
    specialties: ['Kaygı Bozuklukları', 'Travma Sonrası Destek'],
    category: 'clinical',
    languages: ['Türkçe'],
    experienceYears: 9,
    accent: '#5c2848',
  },
  {
    id: 'deniz-koc',
    name: 'Uzm. Psk. Deniz Koç',
    role: 'Psikolog',
    bio: 'Çift ve aile danışmanlığı, iletişim becerileri üzerine çalışır.',
    specialties: ['Çift Danışmanlığı', 'Aile Danışmanlığı'],
    category: 'family',
    languages: ['Türkçe', 'İngilizce'],
    experienceYears: 7,
    accent: '#3a3f5c',
  },
]
