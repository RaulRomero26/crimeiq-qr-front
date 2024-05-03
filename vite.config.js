import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"CrimeIQ QR Code Scanner",
    short_name:"CrimeIQ QR Code",
    description:"Aplicación para escanear códigos QR y llevar registros de los recorridos de los elementos de seguridad",
    icons:[
      {
        src: 'https://solutions.crimeiq.org/android-chrome-144x144.png',
        sizes:'144x144',
        type:'image/png',
       
      },
      {
      src: 'https://solutions.crimeiq.org/android-chrome-192x192.png',
      sizes:'192x192',
      type:'image/png',
     
    },
    {
      src:'https://solutions.crimeiq.org/android-chrome-512x512.png',
      sizes:'512x512',
      type:'image/png',
      
    },
    {
      src: 'https://solutions.crimeiq.org/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      
    },
    {
      src: 'https://solutions.crimeiq.org/maskable_icon.png',
      sizes:'512x512',
      type:'image/png',
      
    }
  ],
  screenshots: [
    {
     "src": "https://solutions.crimeiq.org/screen_1.png",
      "sizes": "640x320",
      "type": "image/gif",
      "form_factor": "wide",
      "label": "CrimeIQ"
    },
    {
     "src": "https://solutions.crimeiq.org/screen_2.png",
      "sizes": "381x659",
      "type": "image/gif",
      "form_factor": "narrow",
      "label": "CrimeIQ"
    }
  ],
  theme_color:'#181818',
  background_color:'#e0cc3b',
  display:"standalone",
  scope:'https://solutions.crimeiq.org/',
  start_url:"'https://solutions.crimeiq.org/",
  orientation:'portrait'
  },
};


export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
  base:'https://solutions.crimeiq.org/'
})
