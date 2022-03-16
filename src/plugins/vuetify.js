// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import colors from 'vuetify/lib/util/colors'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: colors.purple.darken1,
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
            warning: colors.amber.darken3,
            info: colors.blue.darken1,
            success: colors.green.accent3
          }
        }
      }

    }
  }
)
