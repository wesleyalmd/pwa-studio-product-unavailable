module.exports = (targetables, talonsTarget) => {
  /* adding custom productDetails query with stock_status */
  const ProductComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/RootComponents/Product/product.js'
  );
  ProductComponent.addImport(
    "import { GET_CUSTOM_PRODUCT_DETAIL_QUERY } from '@wesleyalmd/pwa-studio-product-unavailable/lib/RootComponents/Product/product.gql';"
  );
  ProductComponent.insertAfterSource(
    'useProduct({',
    '\noperations: { getProductDetailQuery: GET_CUSTOM_PRODUCT_DETAIL_QUERY },\n'
  );

  /* unavailable button */
  const ProductFullDetailComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
  );
  ProductFullDetailComponent.insertBeforeSource('} = talonProps;', ', inStock\n');
  ProductFullDetailComponent.insertBeforeSource(
    '<section className={classes.quantity}>',
    '{inStock ? (\n<>\n'
  );
  ProductFullDetailComponent.insertBeforeSource(
    '<section className={classes.description}>',
    `
    </>
    ) : (
      <section className={classes.cartActions}>
        <Button
          disabled={true}
          priority="low"
          type="button"
        >
          <FormattedMessage
            id={'productFullDetail.unavailable'}
            defaultMessage={'Unavailable'}
          />
        </Button>
      </section>
    )}
    `
  );

  /* Wrap talon useProductFullDetail */
  talonsTarget.tap(talonWrapperConfig => {
    talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
      '@wesleyalmd/pwa-studio-product-unavailable/targets/wrapUseProductFullDetail'
    );
  });
};
