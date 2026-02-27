/**
 * AppAssets — Mirrors Flutter's generated `MyAssets` class (assets.gen.dart).
 *
 * Usage:
 *   import AppAssets from 'src/core/utils/AppAssets';
 *   <Image source={AppAssets.icons.logo} />
 *   <Image source={AppAssets.icons.splashScreenGIF} />
 */

// ─── ICONS (PNG / GIF) ────────────────────────────────────────────────────────
const icons = {
  splashScreenGif:   require('../../assets/icons/splash_screen_gif.gif'),
  addToCart:         require('../../assets/icons/add_to_cart.png'),
  appLogo:           require('../../assets/icons/app_logo.png'),
  arabic:            require('../../assets/icons/arabic.png'),
  bag:               require('../../assets/icons/bag.png'),
  banner:            require('../../assets/icons/banner.png'),
  categoryPng:       require('../../assets/icons/category.png'),
  deleteIcon:        require('../../assets/icons/delete_icon.gif'),
  directoryStructure: require('../../assets/icons/directory_structure.png'),
  logo:              require('../../assets/icons/app_logo.png'),
  empty:             require('../../assets/icons/empty.gif'),
  emptyState:        require('../../assets/icons/empty_state.png'),
  filaCover:         require('../../assets/icons/fila_cover.png'),
  homePng:           require('../../assets/icons/home.png'),
  iconPng:           require('../../assets/icons/icon.png'),
  iconApp:           require('../../assets/icons/icon_app.png'),
  iconAppG:          require('../../assets/icons/icon_app_g.png'),
  iconGreenUp:       require('../../assets/icons/icon_green_up.png'),
  markerUser:        require('../../assets/icons/marker_user.png'),
  offer1:            require('../../assets/icons/offer1.png'),
  offer2:            require('../../assets/icons/offer2.png'),
  offerbanner:       require('../../assets/icons/offerbanner.png'),
  offerbanner1:      require('../../assets/icons/offerbanner1.png'),
  orderConfirm:      require('../../assets/icons/order_confirm.gif'),
  product:           require('../../assets/icons/product.png'),
  productImage:      require('../../assets/icons/product_image.png'),
  profilePng:        require('../../assets/icons/profile.png'),
  profilePicture:    require('../../assets/icons/profile_picture.png'),
  profilePicture1:   require('../../assets/icons/profile_picture1.png'),
  subProduct1:       require('../../assets/icons/sub_product_1.png'),
  subProduct2:       require('../../assets/icons/sub_product_2.png'),
  subProduct3:       require('../../assets/icons/sub_product_3.png'),
  wishlistPng:       require('../../assets/icons/wishlist.png'),
};

// ─── LOTTIE ANIMATIONS (.json) ────────────────────────────────────────────────
const lottie = {
  empty:      require('../../assets/lottie/empty.json'),
  emptyBox:   require('../../assets/lottie/empty_box.json'),
  loadingA:   require('../../assets/lottie/loading_a.json'),
};

// ─── SVG ICON file paths (use react-native-svg to render) ─────────────────────
// Stored as string paths for use with <SvgUri uri={AppAssets.svgPaths.search} />
// or bundled with @svgr/cli (see README for codegen setup).
const svgPaths = {
  about:          'assets/icons/about.svg',
  active:         'assets/icons/active.svg',
  back:           'assets/icons/back.svg',
  bag:            'assets/icons/bag.svg',
  bag2:           'assets/icons/bag2.svg',
  bag3:           'assets/icons/bag3.svg',
  bd:             'assets/icons/bd.svg',
  cart1:          'assets/icons/cart1.svg',
  cart2:          'assets/icons/cart2.svg',
  cart3:          'assets/icons/cart3.svg',
  cartBag:        'assets/icons/cartBag.svg',
  categorySvg:    'assets/icons/category.svg',
  categoryActive: 'assets/icons/category_active.svg',
  check:          'assets/icons/check.svg',
  checkActive:    'assets/icons/check_active.svg',
  close:          'assets/icons/close.svg',
  closeOutline:   'assets/icons/close_outline.svg',
  cod:            'assets/icons/cod.svg',
  contact:        'assets/icons/contact.svg',
  coupon:         'assets/icons/coupon.svg',
  crown:          'assets/icons/crown.svg',
  decrement:      'assets/icons/decrement.svg',
  delete:         'assets/icons/delete.svg',
  down:           'assets/icons/down.svg',
  downEx:         'assets/icons/down_ex.svg',
  eye:            'assets/icons/eye.svg',
  filledHeart:    'assets/icons/filled_heart.svg',
  filter:         'assets/icons/filter.svg',
  forward:        'assets/icons/forward.svg',
  forwardCoupon:  'assets/icons/forward_coupon.svg',
  gallery:        'assets/icons/gallery.svg',
  gm:             'assets/icons/gm.svg',
  heart:          'assets/icons/heart.svg',
  homeSvg:        'assets/icons/home.svg',
  homeActive:     'assets/icons/home_active.svg',
  increment:      'assets/icons/increment.svg',
  language:       'assets/icons/language.svg',
  languageSelect: 'assets/icons/language_select.svg',
  marked:         'assets/icons/marked.svg',
  mastercard:     'assets/icons/mastercard.svg',
  menuBag:        'assets/icons/menu_bag.svg',
  menuEdit:       'assets/icons/menu_edit.svg',
  menuKey:        'assets/icons/menu_key.svg',
  menuLocation:   'assets/icons/menu_location.svg',
  menuLogout:     'assets/icons/menu_logout.svg',
  menuProfile:    'assets/icons/menu_profile.svg',
  menuRefresh:    'assets/icons/menu_refresh.svg',
  moreCircle:     'assets/icons/more_circle.svg',
  other:          'assets/icons/other.svg',
  paypal:         'assets/icons/paypal.svg',
  pp:             'assets/icons/pp.svg',
  profileSvg:     'assets/icons/profile.svg',
  profileActive:  'assets/icons/profile_active.svg',
  radio:          'assets/icons/radio.svg',
  radioActive:    'assets/icons/radio_active.svg',
  refresh:        'assets/icons/refresh.svg',
  remove:         'assets/icons/remove.svg',
  search:         'assets/icons/search.svg',
  shieldDone:     'assets/icons/shield_done.svg',
  star:           'assets/icons/star.svg',
  starRating:     'assets/icons/star_rating.svg',
  stripe:         'assets/icons/stripe.svg',
  tc:             'assets/icons/tc.svg',
  thik:           'assets/icons/thik.svg',
  threedot:       'assets/icons/threedot.svg',
  tickCircle:     'assets/icons/tick_circle.svg',
  uk:             'assets/icons/uk.svg',
  up:             'assets/icons/up.svg',
  visa:           'assets/icons/visa.svg',
  wallet:         'assets/icons/wallet.svg',
  walletPay:      'assets/icons/wallet_pay.svg',
  wishlistSvg:    'assets/icons/wishlist.svg',
  wishlistActive: 'assets/icons/wishlist_active.svg',
  work:           'assets/icons/work.svg',
};

// ─── FONT FAMILY NAMES ────────────────────────────────────────────────────────
// Mirrors Flutter's MyFontFamily class (fonts.gen.dart).
// Must match the fontFamily name declared in react-native.config.js asset linking.
export const FontFamily = {
  cairoBlack:      'Cairo-Black',
  cairoBold:       'Cairo-Bold',
  cairoExtraBold:  'Cairo-ExtraBold',
  cairoExtraLight: 'Cairo-ExtraLight',
  cairoLight:      'Cairo-Light',
  cairoMedium:     'Cairo-Medium',
  cairoRegular:    'Cairo-Regular',
  cairoSemiBold:   'Cairo-SemiBold',
};

const AppAssets = { icons, lottie, svgPaths };

export default AppAssets;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AppAssets } from './core/utils/AppAssets';
import { Image } from 'react-native';

const LogoScreen = () => {
  return (
    <Image 
      source={AppAssets.logo} // تأكد من استدعاء المسار الصحيح الموجود بداخل الكلاس
      style={{ width: 150, height: 50 }} 
    />
  );
};
*/
