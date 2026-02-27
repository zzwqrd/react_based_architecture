// ─── ProductDetails Controller (Hook) ───────────────────────────────────────
// Mirrors Flutter's ProductDetailsCubit (product_details/presentation/manager/controller.dart)
// Contains ALL business logic: fetch, cart, wishlist, UI state.

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../../../store/slices/wishlistSlice';
import { GetProductDetailsUseCase } from '../../domain/usecases/usecases';
import FlashHelper from '../../../../core/utils/flashHelper';

/**
 * useProductDetailsController
 * Mirrors Flutter's ProductDetailsCubit.
 * Manages: product data, cart actions, wishlist, loading state.
 */
const useProductDetailsController = (sku) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((s) => s.wishlist.items);
  const cartItems = useSelector((s) => s.cart.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Derived state
  const isInWishlist = wishlistItems.some((i) => i.sku === sku);
  const cartItem = cartItems.find((i) => i.sku === sku);
  const isInCart = !!cartItem;

  useEffect(() => {
    if (sku) fetchProduct();
  }, [sku]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GetProductDetailsUseCase(sku);
      setProduct(data);
    } catch (e) {
      console.error('❌ [useProductDetailsController] fetch error:', e);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [sku]);

  const priceInfo = product ? {
    regularPrice: product.price_range?.minimum_price?.regular_price?.value,
    finalPrice: product.price_range?.minimum_price?.final_price?.value,
    discount: product.price_range?.minimum_price?.discount?.percent_off ?? 0,
    currency: product.price_range?.minimum_price?.regular_price?.currency ?? 'EGP',
  } : { regularPrice: 0, finalPrice: 0, discount: 0, currency: 'EGP' };

  const hasDiscount = priceInfo.discount > 0;
  const mediaGallery = product?.media_gallery ?? [];
  const isOutOfStock = product?.stock_status === 'OUT_OF_STOCK';
  const reviews = product?.reviews?.items ?? [];
  const descriptionText = (product?.description?.html ?? '').replace(/<[^>]+>/g, '').trim();

  const addToCart = useCallback(() => {
    if (!product) return;
    dispatch(addItem({
      sku: product.sku,
      name: product.name,
      price: priceInfo.finalPrice ?? priceInfo.regularPrice ?? 0,
      imageUrl: mediaGallery[0]?.url ?? product.small_image?.url ?? '',
      quantity: qty,
    }));
    FlashHelper.successToast('تم الإضافة للسلة');
  }, [product, qty, priceInfo, mediaGallery, dispatch]);

  const toggleWishlist = useCallback(() => {
    if (!product) return;
    dispatch(toggleWishlistItem({
      sku: product.sku,
      name: product.name,
      price: priceInfo.finalPrice ?? 0,
      imageUrl: mediaGallery[0]?.url ?? '',
    }));
  }, [product, priceInfo, mediaGallery, dispatch]);

  const incrementQty = useCallback(() => setQty((q) => q + 1), []);
  const decrementQty = useCallback(() => setQty((q) => Math.max(1, q - 1)), []);

  return {
    product, loading, qty, selectedTab, currentImageIndex,
    priceInfo, hasDiscount, mediaGallery, isOutOfStock, reviews, descriptionText,
    isInWishlist, isInCart,
    setSelectedTab, setCurrentImageIndex, incrementQty, decrementQty,
    addToCart, toggleWishlist,
    refresh: fetchProduct,
  };
};

export default useProductDetailsController;
