export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            french: 'French',
            english: 'English',
            home: 'Home',
            experiences: 'My Experiences',
            available: 'Available for freelance work',
            not_available: 'Not available for freelance work',
            my_CV: 'My CV',
            contact_me: 'Contact Me',
            technologies_used: 'Tech Stack',
            check_work: 'Check my work',
            check_works: 'Check my works',
        },
        fr: {
            french: 'Français',
            english: 'Anglais',
            home: 'Accueil',
            experiences: 'Mes expériences',
            availability: 'Disponible pour des missions freelance',
            not_available: 'Non disponible pour des missions freelance',
            my_CV: 'Mon CV',
            contact_me: 'Me contacter',
            technologies_used: 'Technologies Utilisées',
            check_work: 'Voir mon travail',
            check_works: 'Voir mes travaux',
        }
    }
}))
