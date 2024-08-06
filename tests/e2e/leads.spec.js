import { test, expect } from '../support/index';
import { faker } from '@faker-js/faker';

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  await page.toast.containText(message)
});

test('Não deve cadastrar quando o e-mail já existe', async ({ page,request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name:leadName,
      email:leadEmail
    }
  })
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});

test('Não deve cadastrar com e-mail incorreto', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Vanessa Silva', 'vanessa.dias.com')
  await page.landing.alertHaveText('Email incorreto')
});



test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'vanessa.dias@eduzz.com')
  await page.landing.alertHaveText('Campo obrigatório')
});

test('Não deve cadastrar quando o e-mail  não é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Vanessa Silva', '')
  await page.landing.alertHaveText('Campo obrigatório')
});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')
  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});

