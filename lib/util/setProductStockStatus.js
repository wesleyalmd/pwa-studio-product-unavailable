import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';

export const setProductStockStatus = (
  product,
  hasOptionSelected,
  optionCodes,
  optionSelections
) => {
  const { variants } = product;

  if (!isProductConfigurable || !hasOptionSelected) {
    return product.stock_status === 'IN_STOCK';
  }

  const item = findMatchingVariant({
    optionCodes,
    optionSelections,
    variants
  });

  if (!item) return false;

  return item.product.stock_status === 'IN_STOCK';
};
