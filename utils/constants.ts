export const winterSportsImages = [
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
  "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
  "https://images.unsplash.com/photo-1565992441121-4367c2967103",
  "https://images.unsplash.com/photo-1612450622914-f0c1726daa80",
  "https://images.unsplash.com/photo-1613339027986-b94d85708995",
  "https://images.unsplash.com/photo-1610147323479-a7fb11ffd5dd",
  "https://images.unsplash.com/photo-1616038242814-a6eac7845d88",
  "https://images.unsplash.com/photo-1518081461904-9d8f136351c2",
]

export const locations = ["Cerro Catedral", "Valle Nevado", "Las Leñas", "Chapelco", "Cerro Castor", "Innsbruck"]

export const mockRiders = {
  "Cerro Catedral": [
    {
      id: 1,
      name: "Alex Thompson",
      age: 28,
      style: "Freeride",
      level: "Expert",
      avatar: winterSportsImages[0],
      location: "Cerro Catedral",
      joinDate: "Member since 2021",
      bio: "Passionate about freeriding and always looking for new snow adventures.",
      trips: [
        { location: "Whistler", date: "January 2023" },
        { location: "Chamonix", date: "March 2022" },
        { location: "Cerro Castor", date: "August 2021" },
      ],
    },
    {
      id: 2,
      name: "Maria González",
      age: 25,
      style: "Freestyle",
      level: "Advanced",
      avatar: winterSportsImages[1],
      location: "Cerro Catedral",
      joinDate: "Member since 2022",
      bio: "Lover of jumps and tricks. Always looking for park session buddies.",
      trips: [
        { location: "Aspen", date: "December 2022" },
        { location: "Park City", date: "February 2022" },
        { location: "Las Leñas", date: "July 2021" },
      ],
    },
    {
      id: 3,
      name: "Carlos Ramírez",
      age: 30,
      style: "All-Mountain",
      level: "Intermediate",
      avatar: winterSportsImages[2],
      location: "Cerro Catedral",
      joinDate: "Member since 2023",
      bio: "I enjoy exploring the whole mountain. Looking for friends to share snow days.",
      trips: [
        { location: "Vail", date: "January 2023" },
        { location: "Cerro Catedral", date: "August 2022" },
      ],
    },
  ],
  "Valle Nevado": [
    {
      id: 4,
      name: "Lucas Chen",
      age: 27,
      style: "All-Mountain",
      level: "Intermediate",
      avatar: winterSportsImages[2],
      location: "Valle Nevado",
      joinDate: "Member since 2023",
      bio: "Snowboard enthusiast who enjoys exploring all types of terrain.",
      trips: [
        { location: "Vail", date: "January 2023" },
        { location: "Cerro Catedral", date: "August 2022" },
      ],
    },
    {
      id: 5,
      name: "Ana Silva",
      age: 29,
      style: "Freeride",
      level: "Advanced",
      avatar: winterSportsImages[3],
      location: "Valle Nevado",
      joinDate: "Member since 2022",
      bio: "Deep snow and off-piste lover. Looking for adventure companions.",
      trips: [
        { location: "Chamonix", date: "February 2023" },
        { location: "Valle Nevado", date: "August 2022" },
      ],
    },
  ],
  "Las Leñas": [
    {
      id: 6,
      name: "Sofia Ramírez",
      age: 26,
      style: "Freeride",
      level: "Expert",
      avatar: winterSportsImages[3],
      location: "Las Leñas",
      joinDate: "Member since 2020",
      bio: "Passionate about backcountry and steep descents. Looking for off-piste buddies.",
      trips: [
        { location: "Zermatt", date: "February 2023" },
        { location: "Portillo", date: "August 2022" },
        { location: "Cerro Catedral", date: "July 2021" },
      ],
    },
    {
      id: 7,
      name: "Javier López",
      age: 33,
      style: "All-Mountain",
      level: "Intermediate",
      avatar: winterSportsImages[0],
      location: "Las Leñas",
      joinDate: "Member since 2022",
      bio: "Enjoy all aspects of snowboarding. Looking for buddies to improve together.",
      trips: [
        { location: "Las Leñas", date: "August 2022" },
        { location: "Chapelco", date: "July 2021" },
      ],
    },
  ],
  Chapelco: [
    {
      id: 8,
      name: "Valentina Gómez",
      age: 24,
      style: "Freestyle",
      level: "Advanced",
      avatar: winterSportsImages[1],
      location: "Chapelco",
      joinDate: "Member since 2021",
      bio: "Rails and kickers lover. Looking for riders for park sessions and filming tricks.",
      trips: [
        { location: "Park City", date: "January 2023" },
        { location: "Chapelco", date: "August 2022" },
      ],
    },
    {
      id: 9,
      name: "Mateo Rodríguez",
      age: 29,
      style: "Freeride",
      level: "Expert",
      avatar: winterSportsImages[4],
      location: "Chapelco",
      joinDate: "Member since 2020",
      bio: "Expert en rutas fuera de pista. Siempre en busca de nieve virgen y nuevos desafíos.",
      trips: [
        { location: "Hokkaido", date: "January 2023" },
        { location: "Valle Nevado", date: "August 2022" },
        { location: "Las Leñas", date: "July 2021" },
      ],
    },
  ],
  "Cerro Castor": [
    {
      id: 10,
      name: "Laura Blanco",
      age: 27,
      style: "All-Mountain",
      level: "Advanced",
      avatar: winterSportsImages[2],
      location: "Cerro Castor",
      joinDate: "Member since 2019",
      bio: "Versatile in all terrains. Looking for buddies to enjoy the whole mountain.",
      trips: [
        { location: "Breckenridge", date: "December 2022" },
        { location: "Chapelco", date: "August 2022" },
        { location: "Cerro Catedral", date: "July 2021" },
      ],
    },
    {
      id: 11,
      name: "Martín Acosta",
      age: 32,
      style: "Freeride",
      level: "Expert",
      avatar: winterSportsImages[3],
      location: "Cerro Castor",
      joinDate: "Member since 2020",
      bio: "Adrenaline and steep descent lover. Looking for riders for extreme adventures.",
      trips: [
        { location: "Chamonix", date: "February 2023" },
        { location: "Cerro Castor", date: "August 2022" },
      ],
    },
  ],
  Innsbruck: [
    {
      id: 20,
      name: "Lukas Hofer",
      age: 29,
      style: "Freestyle",
      level: "Expert",
      avatar: winterSportsImages[5],
      location: "Innsbruck",
      joinDate: "Member since 2020",
      bio: "Snowpark lover and always looking for new tricks to master.",
      trips: [
        { location: "St. Anton", date: "February 2023" },
        { location: "Mayrhofen", date: "January 2022" },
      ],
    },
    {
      id: 21,
      name: "Emma Schneider",
      age: 26,
      style: "All-Mountain",
      level: "Advanced",
      avatar: winterSportsImages[6],
      location: "Innsbruck",
      joinDate: "Member since 2021",
      bio: "Mountain explorer and winter photography enthusiast.",
      trips: [
        { location: "Ischgl", date: "March 2023" },
        { location: "Sölden", date: "December 2022" },
      ],
    },
  ],
}

export function getRandomProfileImage() {
  return winterSportsImages[Math.floor(Math.random() * winterSportsImages.length)]
}

export function isIphone() {
  return typeof window !== "undefined" && /iPhone/.test(navigator.userAgent)
}

export function getIphoneModel() {
  const width = typeof window !== "undefined" ? window.screen.width : 0
  const height = typeof window !== "undefined" ? window.screen.height : 0

  if (width === 390 && height === 844) return "iPhone 12, 13, 14"
  if (width === 428 && height === 926) return "iPhone 12 Pro Max, 13 Pro Max, 14 Plus"
  if (width === 375 && height === 812) return "iPhone X, XS, 11 Pro"
  if (width === 414 && height === 896) return "iPhone XR, XS Max, 11"
  if (width === 320 && height === 568) return "iPhone 5"
  if (width === 375 && height === 667) return "iPhone 6, 6S, 7, 8"
  if (width === 414 && height === 736) return "iPhone 6 Plus, 6S Plus, 7 Plus, 8 Plus"
  return "Unknown iPhone model"
}

