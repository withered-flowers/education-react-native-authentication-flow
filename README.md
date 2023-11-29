# Education React Native Authentication Flow & Apollo Client GraphQL

## Table of Content

## Scope Pembelajaran

- React Navigation

  - Authentication Flow

- Apollo Client GraphQL

  - Apollo Link
  - gql
  - useQuery
  - useLazyQuery
  - useMutation

- SecureStore
  - setItemAsync
  - getItemAsync
  - deleteItemAsync

## Demo

Step-by-Step

1. Buat LoginContext (`contexts/LoginContext.jsx`)
1. Buat StackHolder.js (`stacks/StackHolder.jsx`)
1. Modif `App.js` untuk menggunakan `LoginProvider`
1. Install `@apollo/client graphql`
1. Buat `apollo.js` (`configs/apollo.js`)
1. Buat `index.js` (`queries/index.js`)
1. Modif `App.js` untuk menggunakan `ApolloProvider`
1. Modif `LoginPage.jsx` untuk melakukan login via GraphQL (sampai muncul di halaman dulu)
1. Install expo-secure-store (`npx expo install expo-secure-store`)
1. Lanjut modif `LoginPage.jsx` untuk menyimpan token ke SecureStore dan "pindah halaman" ke `HomePage.jsx`
1. Modif `configs/apollo.js` untuk menggunakan Apollo Link
1. Modif `queries/index.js` untuk meng-query data colors
1. Modif `screens/HomePage.jsx` untuk menampilkan data colors
1. Modif `queries/index.js` untuk me-mutation data color (`colorAdd`)
1. Modif `screens/ColorAddPage.jsx` untuk menambahkan data color dan me-refresh data colors pada `HomePage.jsx` secara otomatis
1. Modif `screens/HomePage.jsx` untuk menggunakan logout

## References
