import {test,expect} from '@playwright/test';

test('service discovery and provider selection',async({page})=>{await page.goto('/services');await expect(page.getByRole('heading',{name:/find what you need/i})).toBeVisible();await page.locator('input[placeholder="Search services…"]').fill('Doctor');await expect(page.getByText('Doctor Consultation')).toBeVisible();await page.goto('/providers');await expect(page.getByRole('heading',{name:/find the right connection/i})).toBeVisible();await page.getByText(/dr\. Ayu Pratiwi/).click();await expect(page).toHaveURL(/\/providers\/demo-3$/)});

test('sign-in form and private journey guardrail',async({page})=>{await page.goto('/journey');await expect(page.getByRole('heading',{name:/health journey, connected/i})).toBeVisible();await page.getByRole('link',{name:/get started/i}).click();await expect(page.getByRole('heading',{name:/welcome back|create your gohealth account/i})).toBeVisible();});

test('blood access is discoverable and protected for posting',async({page})=>{await page.goto('/blood');await expect(page.getByRole('heading',{name:'Blood Access'})).toBeVisible();await expect(page.getByText(/not a blood bank/i)).toBeVisible();await page.getByRole('button',{name:/request blood/i}).click();await expect(page.getByRole('button',{name:/post request/i})).toBeVisible();});

test('AI assistant has safe failure fallback',async({page})=>{await page.goto('/assistant');await expect(page.getByRole('heading',{name:/your health, better navigated/i})).toBeVisible();await page.locator('input[placeholder="Tanyakan kebutuhan kesehatan Anda…"]').fill('Apa yang perlu saya siapkan sebelum konsultasi dokter?');await page.getByRole('button').last().click();await expect(page.getByText(/GoHealth AI|Layanan AI|Medical disclaimer/i).first()).toBeVisible();});

test('mobile account guardrail',async({page})=>{await page.goto('/account');await expect(page.getByRole('heading',{name:/your health identity/i})).toBeVisible();await expect(page.getByText(/sign in untuk mengelola profil/i)).toBeVisible();});
