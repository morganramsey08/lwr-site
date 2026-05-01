// src/queries/general/getNav.ts
export const GetNavigationQuery = `
  query GetNavigation {
    # Replace 'primary_menu' with the exact slug you registered in functions.php
    menu(id: "primary_menu", idType: LOCATION) {
      menuItems {
        nodes {
          id
          label
          uri
        }
      }
    }
  }
`;