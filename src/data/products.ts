import bluetoothDecoder from '@/assets/products/bluetooth-audio-decoder.png';
import oledDisplay from '@/assets/products/oled-display.png';
import ne555Module from '@/assets/products/ne555-module.png';
import lcdKeypad from '@/assets/products/lcd-keypad-shield.png';
import testLoad from '@/assets/products/electronic-test-load.png';
import buckBoost from '@/assets/products/buck-boost-converter.png';
import voltageProtector from '@/assets/products/voltage-protector.png';
import batteryTester from '@/assets/products/battery-tester.png';
import multimeter from '@/assets/products/digital-multimeter.png';
import lm2596 from '@/assets/products/lm2596-buck-converter.png';

export interface Product {
  id: string;
  name: string;
  description: string;
  aliexpressPrice: number; // in USD
  priceINR: number; // 20% markup in INR
  image: string;
  category: string;
  inStock: boolean;
  specs: string[];
}

// Exchange rate assumption: 1 USD = 83 INR
const USD_TO_INR = 83;
const MARKUP = 1.20; // 20% markup

const calculateINRPrice = (usdPrice: number): number => {
  return Math.round(usdPrice * USD_TO_INR * MARKUP);
};

export const products: Product[] = [
  {
    id: 'bt-decoder-001',
    name: 'Bluetooth Audio Decoder Board',
    description: 'DC 12V USB FM Radio Lossless MP3/WMA/WAV/FLAC/APE Decoder Module with Digital Audio Player',
    aliexpressPrice: 4.50,
    priceINR: calculateINRPrice(4.50),
    image: bluetoothDecoder,
    category: 'Audio',
    inStock: true,
    specs: ['DC 12V Input', 'USB Support', 'FM Radio', 'Multiple Formats'],
  },
  {
    id: 'oled-049-002',
    name: '0.49" OLED Display Module',
    description: 'White 64x32 I2C IIC Interface SSD1306 Driver LCD Module for Arduino AVR STM32',
    aliexpressPrice: 2.20,
    priceINR: calculateINRPrice(2.20),
    image: oledDisplay,
    category: 'Displays',
    inStock: true,
    specs: ['0.49 inch', '64x32 Resolution', 'I2C Interface', 'SSD1306 Driver'],
  },
  {
    id: 'ne555-003',
    name: 'NE555 Pulse Frequency Module',
    description: 'Adjustable duty cycle square/rectangular wave signal generator for stepping motor driver',
    aliexpressPrice: 1.50,
    priceINR: calculateINRPrice(1.50),
    image: ne555Module,
    category: 'Modules',
    inStock: true,
    specs: ['Adjustable Frequency', 'Adjustable Duty Cycle', 'Motor Compatible'],
  },
  {
    id: 'lcd1602-004',
    name: 'LCD Keypad Shield 1602',
    description: 'Blue screen LCD display module for Arduino UNO R3 with integrated keypad buttons',
    aliexpressPrice: 5.80,
    priceINR: calculateINRPrice(5.80),
    image: lcdKeypad,
    category: 'Displays',
    inStock: true,
    specs: ['16x2 Characters', 'Blue Backlight', 'Keypad Buttons', 'Arduino Compatible'],
  },
  {
    id: 'test-load-005',
    name: '15W Electronic Test Load',
    description: 'DC 3V-21V USB Battery Discharge Capacity Tester with Fan and Adjustable Current',
    aliexpressPrice: 8.50,
    priceINR: calculateINRPrice(8.50),
    image: testLoad,
    category: 'Testing',
    inStock: true,
    specs: ['15W Power', '3V-21V Range', 'USB Interface', 'Built-in Fan'],
  },
  {
    id: 'buck-boost-006',
    name: '35W Buck Boost Converter',
    description: 'DC 5.5-30V to 0.5-30V Digital LCD Display Automatic Step Up/Down Power Supply Module',
    aliexpressPrice: 12.00,
    priceINR: calculateINRPrice(12.00),
    image: buckBoost,
    category: 'Power',
    inStock: true,
    specs: ['35W Output', 'LCD Display', 'Auto Step Up/Down', 'Adjustable'],
  },
  {
    id: 'voltage-prot-007',
    name: '3-in-1 Voltage Protector',
    description: '120V AC Voltage Meter with Over/Under Current Protection Relay 40A/63A',
    aliexpressPrice: 18.50,
    priceINR: calculateINRPrice(18.50),
    image: voltageProtector,
    category: 'Protection',
    inStock: true,
    specs: ['3-in-1 Protection', 'LED Display', '40A/63A Rating', 'DIN Rail Mount'],
  },
  {
    id: 'battery-test-008',
    name: '18650 Battery Capacity Tester',
    description: 'Digital Two Channel Battery Power Detector with Type-C Interface',
    aliexpressPrice: 22.00,
    priceINR: calculateINRPrice(22.00),
    image: batteryTester,
    category: 'Testing',
    inStock: true,
    specs: ['Dual Channel', 'Type-C Interface', 'Color Display', 'Auto Test'],
  },
  {
    id: 'multimeter-009',
    name: 'ANENG Smart 3-in-1 Multimeter',
    description: '4000 Counts Digital AC/DC Current Voltage Resistor Measurement with Calendar & Alarm',
    aliexpressPrice: 28.00,
    priceINR: calculateINRPrice(28.00),
    image: multimeter,
    category: 'Testing',
    inStock: true,
    specs: ['4000 Counts', 'True RMS', '3-in-1 Function', 'Data Retention'],
  },
  {
    id: 'lm2596-010',
    name: 'LM2596 DC Buck Converter',
    description: 'Adjustable Power Supply with LED Display Regulator Buck Adapter',
    aliexpressPrice: 3.80,
    priceINR: calculateINRPrice(3.80),
    image: lm2596,
    category: 'Power',
    inStock: true,
    specs: ['LED Display', 'Adjustable Output', 'High Efficiency', 'Compact Size'],
  },
];

export const categories = ['All', 'Audio', 'Displays', 'Modules', 'Power', 'Protection', 'Testing'];
