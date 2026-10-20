export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  eyebrow: string;
  sub: string;
  email: string;
  phone: string;
  phoneRaw: string;
  studioLocation: string;
  responseWindow: string;
  whatsappMessage: string;
  socials: {
    instagram: {
      handle: string;
      url: string;
      badgeTag: string;
    };
    youtube: {
      handle: string;
      url: string;
      badgeTag: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "Rite of Passage",
  shortName: "ROP Atelier",
  tagline: "Arquitectura Sonora de Vanguardia",
  eyebrow: "Productora de Sonido de Primer Nivel",
  sub: "Curaduría Musical · Formación · Hardware · Producción Integral",
  email: "adm.riteofpassage@gmail.com",
  phone: "+54 9 291 407-4772",
  phoneRaw: "5492914074772",
  studioLocation: "Por invitación · En todo el mundo",
  responseWindow: "Respondemos a toda consulta seria dentro de las 48 horas.",
  whatsappMessage: "Hola Rite of Passage, quisiera consultar disponibilidad para un evento bespoke.",
  socials: {
    instagram: {
      handle: "@riteofpassagearg",
      url: "https://www.instagram.com/riteofpassagearg/",
      badgeTag: "@riteofpassagearg"
    },
    youtube: {
      handle: "Rite of Passage Agency",
      url: "https://www.youtube.com/@RiteofPassageAgency",
      badgeTag: "@RiteofPassageAgency"
    }
  }
};
