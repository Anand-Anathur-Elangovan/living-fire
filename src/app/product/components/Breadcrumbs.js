import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = ({ productData }) => {
  const { productType, fuelType, productName } = productData;

  // Constructing breadcrumb links based on product data
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: productType.charAt(0).toUpperCase() + productType.slice(1), href: `/${productType}` },
    { name: `${fuelType.charAt(0).toUpperCase() + fuelType.slice(1)} Fireplaces`, href: `/${productType}/${fuelType}` },
    { name: productName, href: `/${productType}/${fuelType}/${productName.replace(/\s+/g, '-').toLowerCase()}` },
  ];

  return (
    <nav>
      <ul className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link href={breadcrumb.href}>
              <a>{breadcrumb.name}</a>
            </Link>
            {index < breadcrumbs.length - 1 && ' / '}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
