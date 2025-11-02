'use server'
/**
 * ---------------------------------------------------------------------------
 * Firebase-Compatible Auth Configuration for Supastarter
 * ---------------------------------------------------------------------------
 * This version replaces BetterAuth + Prisma with Firebase Auth + Firestore.
 * Works in Firebase Studio, Firebase Hosting, and Cloud Functions environments.
 *
 * Required env vars:
 *  - NEXT_PUBLIC_FIREBASE_API_KEY
 *  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *  - NEXT_PUBLIC_FIREBASE_APP_ID
 *  - NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
 *
 * Maintainer: Ryan Thibodeaux
 * Context: Website Compliance Dashboard (Client Portal)
 * ---------------------------------------------------------------------------
 */

import { initializeApp, getApps, getApp } from 'firebase/app'
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	signOut,
	onAuthStateChanged,
	User
} from 'firebase/auth'
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	collection,
	query,
	where,
	getDocs
} from 'firebase/firestore'
import { parse as parseCookies } from 'cookie'

// Safe access helper for i18n defaults (if @repo/config not loaded)
const i18n = {
	localeCookieName: 'NEXT_LOCALE',
	defaultLocale: 'en',
}

const getLocaleFromRequest = (request?: Request) => {
	const cookies = parseCookies(request?.headers.get('cookie') ?? '')
	return (cookies[i18n.localeCookieName] as string) ?? i18n.defaultLocale
}

// ---------------------------------------------------------------------------
// Firebase Initialization
// ---------------------------------------------------------------------------

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// ---------------------------------------------------------------------------
// User Management Helpers
// ---------------------------------------------------------------------------

export async function registerUser(email: string, password: string) {
	const userCred = await createUserWithEmailAndPassword(auth, email, password)
	await sendEmailVerification(userCred.user)
	// Optionally create Firestore profile document
	await setDoc(doc(db, 'users', userCred.user.uid), {
		email,
		createdAt: new Date(),
		onboardingComplete: false,
	})
	return userCred.user
}

export async function loginUser(email: string, password: string) {
	const userCred = await signInWithEmailAndPassword(auth, email, password)
	return userCred.user
}

export async function logoutUser() {
	await signOut(auth)
}

export async function resetPassword(email: string) {
	await sendPasswordResetEmail(auth, email)
}

export function observeAuthState(callback: (user: User | null) => void) {
	return onAuthStateChanged(auth, callback)
}

// ---------------------------------------------------------------------------
// Organization & Compliance Integration (customizable stubs)
// ---------------------------------------------------------------------------

export async function getOrganizationForUser(userId: string) {
	const orgsRef = collection(db, 'organizations')
	const q = query(orgsRef, where('members', 'array-contains', userId))
	const snapshot = await getDocs(q)
	return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function updateUserLocale(userId: string, locale: string) {
	await updateDoc(doc(db, 'users', userId), { locale })
}

// ---------------------------------------------------------------------------
// Email Send Placeholder (replace with Cloud Function / SendGrid)
// ---------------------------------------------------------------------------

export async function sendEmailPlaceholder(to: string, subject: string, body: string) {
	console.log(`Simulated email → To: ${to}\nSubject: ${subject}\n\n${body}`)
	// Replace with Cloud Function or external API call later
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AppUser = {
	uid: string
	email: string
	onboardingComplete?: boolean
	locale?: string
}

export type Organization = {
	id: string
	name: string
	members: string[]
}

// ---------------------------------------------------------------------------
// Example Usage
// ---------------------------------------------------------------------------
// await registerUser('user@example.com', 'password123')
// const user = await loginUser('user@example.com', 'password123')
// await logoutUser()