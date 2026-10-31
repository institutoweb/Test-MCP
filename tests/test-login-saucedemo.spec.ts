import { test, expect } from '@playwright/test';

/**
 * Test basado en la historia TS-1 "Test Login Saucedemo"
 * https://institutowebfullstack.atlassian.net/browse/TS-1
 *
 * Pasos:
 * 1. Ingresar en saucedemo.com
 * 2. Escribir el usuario standard en el cuadro de texto username
 * 3. Escribir la clave en el cuadro password
 * 4. Hacer click en el botón Login
 * 5. Chequear que se llegó a la url /inventory.html
 * 6. Hacer logout desde el menú hamburguesa
 */

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('TS-1 Test Login Saucedemo', () => {
  test('login con usuario standard, verifica inventory y logout', async ({ page }) => {
    // Paso 1: Ingresar en saucedemo.com
    await page.goto(BASE_URL);

    // Paso 2: Escribir el usuario standard en el cuadro de texto username
    await page.locator('#user-name').fill(USERNAME);

    // Paso 3: Escribir la clave en el cuadro password
        await page.locator('#password').fill(PASSWORD);

    // Paso 4: Hacer click en el botón Login
    await page.locator('#login-button').click();

    // Paso 5: Chequear que se llegó a la url /inventory.html
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Paso 6: Hacer logout desde el menú hamburguesa
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // Verificación del logout: volver al login
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});