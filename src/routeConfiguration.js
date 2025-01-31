import React from 'react';
import {
  AboutPage,
  AuthenticationPage,
  CareersPage,
  CheckoutPage,

	// Legals

  CommunityGuidelinesPage,
  ContactDetailsPage,
  CookiePolicyPage,
  LegalsDealsPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
	
	// Deals

  DealsPage,
  BirthdayDealPage,
  CorporateDealPage,
	RecommendDealPage,

	// Pricing

	BookAPartyPage,
	ListMySpacePage,

	// Help Center

	ContactUsPage,
	DealsHelpPage,
	FAQPage,
	FeesPage,
	FirstStepsPage,
	GuidebookForProvidersPage,
	
  EditListingPage,
  EmailVerificationPage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  NotFoundPage,
  NonDiscriminationPolicyPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  PayoutPreferencesPage,
  ProfilePage,
  ProfileSettingsPage,
  SearchPage,
  StyleguidePage,
  TransactionPage,
} from './containers';

// routeConfiguration needs to initialize containers first
// Otherwise, components will import form container eventually and
// at that point css bundling / imports will happen in wrong order.
import { NamedRedirect } from './components';

export const ACCOUNT_SETTINGS_PAGES = [
  'ContactDetailsPage',
  'PasswordChangePage',
  'PayoutPreferencesPage',
];

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = () => {
  return [
    {
      path: '/',
      name: 'LandingPage',
      component: props => <LandingPage {...props} />,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/careers',
      name: 'CareersPage',
      component: CareersPage,
    },
    {
      path: '/s',
      name: 'SearchPage',
      component: props => <SearchPage {...props} />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/filters',
      name: 'SearchFiltersPage',
      component: props => <SearchPage {...props} tab="filters" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/listings',
      name: 'SearchListingsPage',
      component: props => <SearchPage {...props} tab="listings" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/map',
      name: 'SearchMapPage',
      component: props => <SearchPage {...props} tab="map" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/l',
      name: 'ListingBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/l/:slug/:id',
      name: 'ListingPage',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/checkout',
      name: 'CheckoutPage',
      auth: true,
      component: props => <CheckoutPage {...props} />,
      setInitialValues: CheckoutPage.setInitialValues,
    },
    {
      path: '/l/:slug/:id/:variant',
      name: 'ListingPageVariant',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/new',
      name: 'NewListingPage',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
        />
      ),
    },
    {
      path: '/l/:slug/:id/:type/:tab',
      name: 'EditListingPage',
      auth: true,
      component: props => <EditListingPage {...props} />,
      loadData: EditListingPage.loadData,
    },

    // Canonical path should be after the `/l/new` path since they
    // conflict and `new` is not a valid listing UUID.
    {
      path: '/l/:id',
      name: 'ListingPageCanonical',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/u',
      name: 'ProfileBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/u/:id',
      name: 'ProfilePage',
      component: props => <ProfilePage {...props} />,
      loadData: ProfilePage.loadData,
    },
    {
      path: '/profile-settings',
      name: 'ProfileSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ProfileSettingsPage {...props} />,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: props => <AuthenticationPage {...props} tab="login" />,
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: props => <AuthenticationPage {...props} tab="signup" />,
    },
    {
      path: '/recover-password',
      name: 'PasswordRecoveryPage',
      component: props => <PasswordRecoveryPage {...props} />,
    },
    {
      path: '/inbox',
      name: 'InboxBasePage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
    },
    {
      path: '/inbox/:tab',
      name: 'InboxPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <InboxPage {...props} />,
      loadData: InboxPage.loadData,
    },
    {
      path: '/order/:id',
      name: 'OrderPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="OrderDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/order/:id/details',
      name: 'OrderDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="customer" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'customer' }),
      setInitialValues: TransactionPage.setInitialValues,
    },
    {
      path: '/sale/:id',
      name: 'SalePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="SaleDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/sale/:id/details',
      name: 'SaleDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="provider" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'provider' }),
    },
    {
      path: '/listings',
      name: 'ManageListingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ManageListingsPage {...props} />,
      loadData: ManageListingsPage.loadData,
    },
    {
      path: '/account',
      name: 'AccountSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="ContactDetailsPage" />,
    },
    {
      path: '/account/contact-details',
      name: 'ContactDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ContactDetailsPage {...props} />,
      loadData: ContactDetailsPage.loadData,
    },
    {
      path: '/account/change-password',
      name: 'PasswordChangePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PasswordChangePage {...props} />,
    },
    {
      path: '/account/payments',
      name: 'PayoutPreferencesPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PayoutPreferencesPage {...props} />,
      loadData: PayoutPreferencesPage.loadData,
    },
    {
      path: '/benefits',
      name: 'DealsPage',
      component: props => <DealsPage {...props} />,
    },
    {
			path: '/benefits/birthday-gift',
      name: 'BirthdayDealPage',
      component: props => <BirthdayDealPage {...props} />,
    },
    {
			path: '/benefits/corporate-benefit',
      name: 'CorporateDealPage',
      component: props => <CorporateDealPage {...props} />,
    },
    {
			path: '/legal/benefits',
      name: 'LegalsDealsPage',
      component: props => <LegalsDealsPage {...props} />,
    },
    {
			path: '/benefits/recommend-gift',
      name: 'RecommendDealPage',
      component: props => <RecommendDealPage {...props} />,

    },
    {
			path: '/legal/terms-of-service',
      name: 'TermsOfServicePage',
      component: props => <TermsOfServicePage {...props} />,
    },
    {
			path: '/legal/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: props => <PrivacyPolicyPage {...props} />,
    },
    {
			path: '/legals/inclusion',
      name: 'NonDiscriminationPolicyPage',
      component: props => <NonDiscriminationPolicyPage {...props} />,
    },
    {
			path: '/legal/cookie-policy',
      name: 'CookiePolicyPage',
      component: props => <CookiePolicyPage {...props} />,
    },
    {
			path: '/legal/community-guidelines',
      name: 'CommunityGuidelinesPage',
      component: props => <CommunityGuidelinesPage {...props} />,
    },
    {
			path: '/pricing/book-a-party',
      name: 'BookAPartyPage',
      component: props => <BookAPartyPage {...props} />,
    },
    {
			path: '/pricing/list-my-space',
      name: 'ListMySpacePage',
      component: props => <ListMySpacePage {...props} />,
    },
    {
			path: '/contact-us',
      name: 'ContactUsPage',
      component: props => <ContactUsPage {...props} />,
    },
    {
			path: '/contact-us/:enquiry',
      name: 'ContactUsPageEnquiry',
      component: props => <ContactUsPage {...props} />,
    },
    {
			path: '/help/benefits',
      name: 'DealsHelpPage',
      component: props => <DealsHelpPage {...props} />,
    },
    {
			path: '/help/FAQ',
      name: 'FAQPage',
      component: props => <FAQPage {...props} />,
    },
    {
			path: '/help/fees',
      name: 'FeesPage',
      component: props => <FeesPage {...props} />,
    },
    {
			path: '/help/first-step',
      name: 'FirstStepsPage',
      component: props => <FirstStepsPage {...props} />,
    },
    {
			path: '/help/providers-guidebook',
      name: 'GuidebookForProvidersPage',
      component: props => <GuidebookForProvidersPage {...props} />,
    },
    {
			path: '/help/contact-us',
      name: 'ContactUsPage',
      component: props => <ContactUsPage {...props} />,
    },
    {
			path: '/legals/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: props => <PrivacyPolicyPage {...props} />,
    },
    {
			path: '/legals/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: props => <PrivacyPolicyPage {...props} />,
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/g/:group',
      name: 'StyleguideGroup',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component',
      name: 'StyleguideComponent',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example',
      name: 'StyleguideComponentExample',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example/raw',
      name: 'StyleguideComponentExampleRaw',
      component: props => <StyleguidePage raw {...props} />,
    },
    {
      path: '/notfound',
      name: 'NotFoundPage',
      component: props => <NotFoundPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /reset-password endpoint
    {
      path: '/reset-password',
      name: 'PasswordResetPage',
      component: props => <PasswordResetPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /verify-email endpoint
    {
      path: '/verify-email',
      name: 'EmailVerificationPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <EmailVerificationPage {...props} />,
    },
  ];
};

export default routeConfiguration;
