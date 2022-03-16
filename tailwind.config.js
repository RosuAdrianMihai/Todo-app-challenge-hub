module.exports = {
  darkMode: 'class',
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "light-background": "hsl(0, 0%, 98%)",
        "light-completed": "hsl(236, 33%, 92%)",
        "light-wings":  "hsl(233, 11%, 84%)",
        "light-center": "hsl(236, 9%, 61%)",
        "light-text": "hsl(235, 19%, 35%)",
        "drag-over": "hsl(251deg, 43%, 52%)",

        "dark-background": "hsl(235, 21%, 11%)",
        "dark-list": "hsl(235, 24%, 19%)",
        "dark-text": "hsl(234, 39%, 85%)",
        "dark-menu-hover": "hsl(236, 33%, 92%)",
        "dark-completed": "hsl(234, 11%, 52%)",
        "filter-selected": "hsl(220, 98%, 61%)",
        "from-g": "hsl(192, 100%, 67%)",
        "to-g": "hsl(280, 87%, 65%)"
      },
      backgroundImage: {
        "bg-desktop-light-mode": "url('bg-desktop-light.jpg')",
        "bg-desktop-dark-mode": "url('bg-desktop-dark.jpg')",
        "bg-mobile-light-mode": "url('bg-mobile-light.jpg')",
        "bg-mobile-dark-mode": "url('bg-mobile-dark.jpg')"
      }
    },
  },
  plugins: [],
}
