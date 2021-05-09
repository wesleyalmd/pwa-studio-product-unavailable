import { useMemo, useState, useCallback } from 'react';
import { deriveOptionCodesFromProduct } from '../lib/util/deriveOptionCodesFromProduct';
import { setProductStockStatus } from '../lib/util/setProductStockStatus';

const wrapUseProductFullDetail = defaultProductFullDetail => {
  return (props, ...rest) => {
    const { product } = props;
    const defaultTalonProps = defaultProductFullDetail(props, ...rest);

    /**
     * optionsCodes, optionsSelections and handleSelectionChange are
     * defaults properties of useProductFullDetail and should not be
     * rewritten. solution understood as provisional until the use
     * ProductFullDetail talon returns inStock propety
     */
    const optionCodes = useMemo(() => deriveOptionCodesFromProduct(product), [product]);
    const [optionSelections, setOptionSelections] = useState(new Map());

    const handleSelectionChange = useCallback(
      (optionId, selection) => {
        const nextOptionSelections = new Map([...optionSelections]);
        nextOptionSelections.set(optionId, selection);
        setOptionSelections(nextOptionSelections);

        defaultTalonProps.handleSelectionChange(optionId, selection);
      },
      [optionSelections]
    );

    /* check if options are selected */
    const hasOptionSelected = useMemo(() => {
      const filtered = Array.from(optionSelections.values()).filter(value => !!value);
      return optionSelections && filtered.length > 0;
    }, [optionSelections]);

    /* stock status from selected options */
    const inStock = setProductStockStatus(
      product,
      hasOptionSelected,
      optionCodes,
      optionSelections
    );

    return {
      ...defaultTalonProps,
      handleSelectionChange,
      inStock
    };
  };
};

export default wrapUseProductFullDetail;
