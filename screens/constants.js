export const FORM_FIELDS_NAMES = {
  name: "name",
  email: "email",
  password: "password",
};

export const DEFAULT_REGISTRATION_FORM_VALUES = {
  [FORM_FIELDS_NAMES.name]: "",
  [FORM_FIELDS_NAMES.email]: "",
  [FORM_FIELDS_NAMES.password]: "",
};

export const DEFAULT_LOGIN_FORM_VALUES = {
  [FORM_FIELDS_NAMES.email]: "",
  [FORM_FIELDS_NAMES.password]: "",
};

export const HOME_TABS_OPTIONS = {
  headerTitleAlign: "center",
  headerRightContainerStyle: {
    backgroundColor: "red",
    right: 10,
  },
  headerTitleContainerStyle: {
    backgroundColor: "green",
  },
  headerLeftContainerStyle: {
    backgroundColor: "blue",
    left: 10,
  },
  headerTitleStyle: {
    marginHorizontal: 10,
  },
  tabBarShowLabel: false,
};

export const AUTH_ERRORS = {
  noUser: "Ви не зареєстровані",
  userError: "Hеправильні електронна адреса або пароль",
  serverError: "Помилка сервера. Спробуйте пізніше",
};
