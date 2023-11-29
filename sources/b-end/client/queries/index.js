import { gql } from "@apollo/client";

export const DO_LOGIN = gql`
  query DoLogin($inputLogin: UserLoginInput) {
    login(inputLogin: $inputLogin) {
      statusCode
      message
      data {
        token
      }
    }
  }
`;

export const GET_COLORS = gql`
  query GetColors {
    colors {
      statusCode
      message
      data {
        _id
        name
        year
        color
        pantone_value
      }
    }
  }
`;

export const ADD_COLOR = gql`
  mutation ColorAdd($color: ColorInput) {
    colorAdd(color: $color) {
      statusCode
      message
      data {
        acknowledged
        insertedId
      }
    }
  }
`;
