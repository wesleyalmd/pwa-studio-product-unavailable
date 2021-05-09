import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

export const deriveOptionCodesFromProduct = product => {
  if (!isProductConfigurable(product)) return new Map();

  const initialOptionCodes = new Map();
  for (const { attribute_id, attribute_code } of product.configurable_options) {
    initialOptionCodes.set(attribute_id, attribute_code);
  }

  return initialOptionCodes;
};
