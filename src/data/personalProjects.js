import { FaNetworkWired, FaShoppingCart } from 'react-icons/fa';

const personalProjects = [
  {
    icon:    FaNetworkWired,
    title:   'Custom CRM Integration for Contact Forms',
    desc:    'Developed and deployed custom WordPress contact forms that integrate with external CRM platforms, automating lead capture and ensuring secure, real-time data transfer via APIs.',
    bullets: [
      'Integrated WordPress forms with EDM, CallGrid, and Ringba CRMs for automated lead processing.',
      'Collected user data and delivered it securely to third-party systems via APIs.',
    ],
  },
  {
    icon:    FaShoppingCart,
    title:   'WooCommerce Store Setup',
    desc:    'Built fully functional WooCommerce stores from scratch for multiple clients, covering product setup, payment gateways, and a responsive, user-friendly shopping experience.',
    bullets: [
      'Handled everything from product listings to payment gateway integration end-to-end.',
      'Used Elementor to ensure responsiveness and user-friendly design across all devices.',
    ],
  },
];

export default personalProjects;
