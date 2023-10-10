// ==============================================================
//                            IMPORTANT
// Please make sure to maintain the same interface for all icons:
// - `size` (default: 8)
// - `className` (default: "")
// - `color` (default: "none")
//
// It conforms to the `react-bootstrap-icons` interface.
//
// Also remember to:
// - map size to the `width` and `height` attributes,
// - map `className` to the `className` attribute,
// - map `color` to the `fill` attribute.
// ==============================================================

// TODO: switch to react-simple-icons for social and company icons

export const Keybase = ({ size = 8, className, color = "none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={color}>
      <path
        fill="currentColor"
        d="M10.445 21.372a.953.953 0 1 1-.955-.954c.524 0 .951.43.951.955m5.923-.001a.953.953 0 1 1-.958-.954c.526 0 .954.43.954.955m4.544-9.16l-.156-.204c-.046-.06-.096-.116-.143-.175c-.045-.06-.094-.113-.141-.169c-.104-.12-.21-.239-.32-.359l-.075-.08l-.091-.099l-.135-.13c-.015-.019-.032-.035-.05-.054a10.87 10.87 0 0 0-3.955-2.504l-.23-.078l.035-.083a4.109 4.109 0 0 0-.12-3.255a4.11 4.11 0 0 0-2.438-2.16c-.656-.216-1.23-.319-1.712-.305c-.033-.105-.1-.577.496-1.848L10.662 0l-.287.399c-.33.455-.648.895-.945 1.328a1.857 1.857 0 0 0-1.245-.58L6.79 1.061h-.012c-.033-.003-.07-.003-.104-.003c-.99 0-1.81.771-1.87 1.755l-.088 1.402v.003a1.876 1.876 0 0 0 1.755 1.98l1.002.06c-.065.84.073 1.62.405 2.306a11.28 11.28 0 0 0-3.66 2.484C.912 14.392.912 18.052.912 20.995v1.775l1.305-1.387c.266.93.652 1.807 1.145 2.615H5.06a9.197 9.197 0 0 1-1.68-3.848l1.913-2.03l-.985 3.09l1.74-1.267c3.075-2.234 6.745-2.75 10.91-1.53c1.806.533 3.56.04 4.474-1.256l.104-.165c.09.498.14.998.14 1.496c0 1.563-.254 3.687-1.38 5.512h1.612c.776-1.563 1.181-3.432 1.181-5.512c-.001-2.2-.786-4.421-2.184-6.274zM8.894 6.192c.122-1.002.577-1.949 1.23-2.97a1.36 1.36 0 0 0 1.283.749c.216-.008.604.025 1.233.232a2.706 2.706 0 0 1 1.608 1.425c.322.681.349 1.442.079 2.15a2.69 2.69 0 0 1-.806 1.108l-.408-.502l-.002-.003a1.468 1.468 0 0 0-2.06-.205c-.334.27-.514.66-.534 1.058c-1.2-.54-1.8-1.643-1.628-3.04zm4.304 5.11l-.52.425a.228.228 0 0 1-.323-.032l-.11-.135a.238.238 0 0 1 .034-.334l.51-.42l-1.056-1.299a.307.307 0 0 1 .044-.436a.303.303 0 0 1 .435.041l2.963 3.646a.309.309 0 0 1-.168.499a.315.315 0 0 1-.31-.104l-.295-.365l-1.045.854a.244.244 0 0 1-.154.055a.237.237 0 0 1-.186-.09l-.477-.58a.24.24 0 0 1 .035-.335l1.05-.858l-.425-.533zM7.752 4.866l-1.196-.075a.463.463 0 0 1-.435-.488l.09-1.4a.462.462 0 0 1 .461-.437h.024l1.401.091a.459.459 0 0 1 .433.488l-.007.101a9.27 9.27 0 0 0-.773 1.72zm12.525 11.482c-.565.805-1.687 1.08-2.924.718c-3.886-1.141-7.397-.903-10.469.7l1.636-5.122l-5.29 5.609c.098-3.762 2.452-6.967 5.757-8.312c.471.373 1.034.66 1.673.841c.16.044.322.074.48.102a1.41 1.41 0 0 0 .21 1.408l.075.09c-.172.45-.105.975.221 1.374l.476.582a1.39 1.39 0 0 0 1.079.513c.32 0 .635-.111.886-.314l.285-.232c.174.074.367.113.566.113a1.45 1.45 0 0 0 .928-.326c.623-.51.72-1.435.209-2.06l-1.67-2.057a4.07 4.07 0 0 0 .408-.38c.135.036.27.077.4.12c.266.096.533.197.795.314a9.55 9.55 0 0 1 2.77 1.897c.03.03.06.055.086.083l.17.176c.038.039.076.079.11.12c.08.085.16.175.24.267l.126.15c.045.053.086.104.13.16l.114.15c.04.05.079.102.117.154c.838 1.149.987 2.329.404 3.157v.005zM7.718 4.115l-.835-.05l.053-.836l.834.051z"
      />
    </svg>
  );
};

// From Simple Icons: https://simpleicons.org/
export const GoogleScholar = ({ size = 8, className, color = "none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={color}>
      <path
        fill="currentColor"
        d="M5.242 13.769L0 9.5L12 0l12 9.5l-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14a7 7 0 0 0 0-14z"
      />
    </svg>
  );
};
