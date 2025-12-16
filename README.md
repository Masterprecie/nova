# Crypto Exchange Platform

A modern cryptocurrency exchange platform built with Next.js, featuring multi-step forms with comprehensive validation.

## Features

- Multi-step form with validation
- Real-time form validation using Formik & Yup
- Loading states and error handling
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 22.x or higher
- npm or yarn

## Setup Instructions

1. **Clone the repository**

```bash
   git clone <https://github.com/Masterprecie/nova.git>
   cd nova
```

2. **Install dependencies**

```bash
   npm install
   # or
   yarn install
```

3. **Run the development server**

```bash
   npm run dev
   # or
   yarn dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Form Validation Rules

### Bank Details

- **Bank**: Required
- **Account Number**: Required, must be exactly 10 digits
- **Account Name**: Required, minimum 3 characters

### Contact Details

- **Email**: Required, must be valid email format
- **Phone**: Required, 10-11 digits

## Assumptions & Trade-offs

### Assumptions:

1. **No Backend Integration**: All data is stored in component state
2. **Mock API Calls**: Simulated with setTimeout for demonstration
3. **Nigerian Context**: Phone numbers use +234 prefix
4. **Account Numbers**: Standard 10-digit format (NUBAN)

### Trade-offs:

1. **State Management**: Used React state instead of Redux/Zustand for simplicity
2. **Validation Library**: Chose Formik + Yup for robust validation with minimal setup
3. **No Persistence**: Form data is lost on page refresh (can be enhanced with localStorage)
4. **Limited Banks**: Only 3 banks listed (can be expanded with API integration)

## Form Flow

1. **Step 1 - Bank Details**: Capture banking information
2. **Step 2 - Contact Details**: Collect recipient contact info
3. **Step 3 - Crypto Send**: Display wallet address and transaction details
4. **Step 4 - Success**: Show confirmation and transaction summary

## Styling

- **Framework**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Icons**: Lucide React

## Testing the Form

1. Try submitting empty forms to see validation errors
2. Enter invalid email/phone formats
3. Use the back button to navigate between steps
4. All form data persists when navigating back
5. Copy wallet address and transaction ID

## Future Enhancements

- [ ] Integrate real banking API for account verification
- [ ] Add transaction history
- [ ] Implement actual blockchain integration
- [ ] Add unit tests with Jest/React Testing Library

## License

MIT
