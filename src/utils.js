export const API = 'https://api.tvmaze.com'

const STATUS = { 
    Running: 'En cours',
     Ended: 'Termineer', 
    'To Be Determined':
    'À determiner', 
    'In Development':
    'En developpement' }
export const DAYS = { 
    Monday: 'lundi',
    Tuesday: 'mardi',
    Wednesday: 'mercredi',
    Thursday: 'jeudi',
    Friday: 'vendredi',
    Saturday: 'samedi',
    Sunday: 'dimanche' }

export const fr = (s) => STATUS[s] || s || '—'
export const year = (s) => (s.premiered ? +s.premiered.slice(0, 4) : null)
export const note = (s) => (s.rating && s.rating.average) || null
export const strip = (h) => (h || '').replace(/<[^>]*>/g, '')
export const https = (u) => (u ? u.replace(/^http:/, 'https:') : null)
export const poster = (s, k = 'medium') => (s.image ? https(s.image[k] || s.image.medium) : null)
