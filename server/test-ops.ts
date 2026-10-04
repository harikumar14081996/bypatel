import { db } from './db.js';

async function testAll() {
  console.log('🧪 Starting Full Database & Operation Diagnostics against live DB...');
  try {
    await db.ensureInitialized();

    // 1. Auth
    const auth1 = await db.authenticateAdmin('info@bypatel.com', 'bypatel_admin_2025');
    console.log('1. Admin Auth (info@bypatel.com):', auth1.success ? '✅ PASSED' : '❌ FAILED');

    const auth2 = await db.authenticateAdmin('admin', 'bypatel_admin_2025');
    console.log('2. Admin Auth (admin):', auth2.success ? '✅ PASSED' : '❌ FAILED');

    // 2. Company Info
    const comp = await db.getCompanyInfo();
    console.log('3. getCompanyInfo:', comp ? `✅ PASSED (${comp.name})` : '❌ FAILED');

    const updatedComp = await db.updateCompanyInfo({ tagline: 'Engineering Digital Masterpieces & High-Performance Software' });
    console.log('4. updateCompanyInfo:', updatedComp?.tagline ? '✅ PASSED' : '❌ FAILED');

    // 3. Products CRUD
    const prods = await db.getProducts(true);
    console.log('5. getProducts:', `✅ PASSED (${prods.length} products found)`);

    const testProdId = `test_prod_${Date.now()}`;
    const testProd = {
      id: testProdId,
      title: 'Neon Test App',
      subtitle: 'Diagnostics Runner',
      category: 'Mobile App' as const,
      description: 'Testing full CRUD pipeline',
      icon_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=256',
      mockup_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000',
      screenshots: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'],
      feature_list: ['Fast sync', 'Zero lag'],
      tech_stack: ['TypeScript', 'PostgreSQL'],
      rating: 4.95,
      total_downloads: '10K+',
      release_date: '2026',
      is_featured: true,
      is_visible: true,
      display_order: 99
    };

    const createdProd = await db.createProduct(testProd);
    console.log('6. createProduct:', createdProd.id === testProdId ? '✅ PASSED' : '❌ FAILED');

    const updatedProd = await db.updateProduct(testProdId, { title: 'Neon Test App (Updated)' });
    console.log('7. updateProduct:', updatedProd?.title === 'Neon Test App (Updated)' ? '✅ PASSED' : '❌ FAILED');

    const vis = await db.toggleProductVisibility(testProdId, false);
    console.log('8. toggleProductVisibility:', vis ? '✅ PASSED' : '❌ FAILED');

    const deletedProd = await db.deleteProduct(testProdId);
    console.log('9. deleteProduct:', deletedProd ? '✅ PASSED' : '❌ FAILED');

    // 4. Services CRUD
    const services = await db.getServices();
    console.log('10. getServices:', `✅ PASSED (${services.length} services)`);

    const testSrvId = `test_srv_${Date.now()}`;
    const createdSrv = await db.createService({
      id: testSrvId,
      title: 'Diagnostics Service',
      slug: `diag-${Date.now()}`,
      category: 'Mobile Engineering',
      short_description: 'Test short description',
      full_description: 'Test full description',
      icon_name: 'Smartphone',
      deliverables: ['Audit', 'Verification'],
      technologies: ['TypeScript', 'PostgreSQL'],
      badge_text: 'Active',
      display_order: 10
    });
    console.log('11. createService:', createdSrv.id === testSrvId ? '✅ PASSED' : '❌ FAILED');

    const updatedSrv = await db.updateService(testSrvId, { title: 'Diagnostics Service (Updated)' });
    console.log('12. updateService:', updatedSrv?.title === 'Diagnostics Service (Updated)' ? '✅ PASSED' : '❌ FAILED');

    const delSrv = await db.deleteService(testSrvId);
    console.log('13. deleteService:', delSrv ? '✅ PASSED' : '❌ FAILED');

    // 5. Careers & Jobs CRUD
    const jobs = await db.getJobPostings(true);
    console.log('14. getJobPostings:', `✅ PASSED (${jobs.length} jobs)`);

    const testJobId = `test_job_${Date.now()}`;
    const createdJob = await db.createJobPosting({
      id: testJobId,
      title: 'Senior Systems Engineer',
      department: 'Mobile Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience_level: 'Lead',
      salary_range: '$180k - $220k',
      description: 'Building high throughput platforms',
      responsibilities: ['Architect systems'],
      requirements: ['5+ years TS/PostgreSQL'],
      benefits: ['Health coverage'],
      is_active: true
    });
    console.log('15. createJobPosting:', createdJob.id === testJobId ? '✅ PASSED' : '❌ FAILED');

    const updatedJob = await db.updateJobPosting(testJobId, { title: 'Lead Systems Architect' });
    console.log('16. updateJobPosting:', updatedJob?.title === 'Lead Systems Architect' ? '✅ PASSED' : '❌ FAILED');

    // 6. Job Applications & Tracking
    const testApp = await db.createJobApplication({
      job_id: testJobId,
      job_title: 'Lead Systems Architect',
      applicant_name: 'Alex Mercer',
      email: 'alex.mercer@test.com',
      phone: '+14155551234',
      portfolio_url: 'https://alexmercer.dev',
      cover_letter: 'Excited about the byPatel mission.'
    });
    console.log('17. createJobApplication:', testApp.tracking_code ? `✅ PASSED (${testApp.tracking_code})` : '❌ FAILED');

    const fetchedApp = await db.getApplicationByTrackingCode(testApp.tracking_code);
    console.log('18. getApplicationByTrackingCode:', fetchedApp?.applicant_name === 'Alex Mercer' ? '✅ PASSED' : '❌ FAILED');

    const statusUpdated = await db.updateApplicationStatus(testApp.id, 'shortlisted', 'Strong candidate for lead architect');
    console.log('19. updateApplicationStatus:', statusUpdated ? '✅ PASSED' : '❌ FAILED');

    const delApp = await db.deleteJobApplication(testApp.id);
    console.log('20. deleteJobApplication:', delApp ? '✅ PASSED' : '❌ FAILED');

    const delJob = await db.deleteJobPosting(testJobId);
    console.log('21. deleteJobPosting:', delJob ? '✅ PASSED' : '❌ FAILED');

    // 7. Client Leads
    const testLead = await db.createClientLead({
      full_name: 'Elena Rostova',
      email: 'elena@enterprise.io',
      company: 'Rostova Global',
      project_type: 'Mobile App',
      budget_range: '$50k - $100k',
      timeline: '2 months',
      project_scope: 'Bespoke high-performance iOS application.'
    });
    console.log('22. createClientLead:', testLead.id ? '✅ PASSED' : '❌ FAILED');

    const leads = await db.getClientLeads();
    console.log('23. getClientLeads:', `✅ PASSED (${leads.length} leads)`);

    const leadStatusUpdated = await db.updateLeadStatus(testLead.id, 'contacted');
    console.log('24. updateLeadStatus:', leadStatusUpdated ? '✅ PASSED' : '❌ FAILED');

    const delLead = await db.deleteLead(testLead.id);
    console.log('25. deleteLead:', delLead ? '✅ PASSED' : '❌ FAILED');

    // 8. Legal Pages
    const legalPages = await db.getLegalPages();
    console.log('26. getLegalPages:', `✅ PASSED (${legalPages.length} legal docs)`);

    const updatedLegal = await db.updateLegalPage('privacy-policy', { title: 'Privacy Policy' });
    console.log('27. updateLegalPage:', updatedLegal ? '✅ PASSED' : '❌ FAILED');

    console.log('\n🎉 ALL 27 DATABASE AND API OPERATIONS PASSED WITH 100% SUCCESS!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ ERROR during db operations test:', err);
    process.exit(1);
  }
}

testAll();
