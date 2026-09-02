import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px] px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 size-3.5" />
          Back to home
        </Link>
        
        <div className="prose prose-invert max-w-none">
          <h1 className="text-balance text-[2rem] font-semibold tracking-[-0.02em] text-foreground sm:text-[2.6rem]">
            LOCUS AI Terms of Service
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Version 1.0 - Effective Date: August 15, 2026
          </p>
          
          <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              These Terms of Service (“Terms”) govern your access to and use of the LOCUS AI application, website, software, integrations, APIs, and related services (collectively, the “Service”) operated by LOCUS AI (“LOCUS AI,” “we,” “us,” or “our”).
            </p>
            <p>Please read these Terms carefully before using the Service.</p>
            <p>
              By creating an account, connecting an integration, accessing, or using LOCUS AI, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p>If you do not agree with these Terms, you may not access or use the Service.</p>
            
            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">1. Eligibility</h2>
              <p>You must be at least 18 years old, or the age of legal majority in your jurisdiction, to use LOCUS AI.</p>
              <p>If you access or use the Service on behalf of a company, organization, or other legal entity, you represent that you have the authority to accept these Terms on its behalf.</p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">2. User Accounts and Responsibilities</h2>
              <p>Certain features of LOCUS AI require you to create an account.</p>
              <p>You agree to provide accurate, complete, and current account information and to update that information when necessary.</p>
              <p>You are responsible for maintaining the confidentiality and security of your login credentials and for activity conducted through your account.</p>
              <p>You must promptly notify LOCUS AI if you become aware of unauthorized access to or use of your account.</p>
              <p>We may suspend or terminate accounts where we reasonably believe there has been unauthorized activity, fraud, misuse, or a violation of these Terms.</p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">3. LOCUS AI Service</h2>
              <p>LOCUS AI provides an organizational memory and contextual intelligence platform designed to help users connect, organize, retrieve, and understand workplace information across supported applications and data sources.</p>
              <p>The Service may include organizational memory, contextual search, AI-generated summaries, structured memory, decision and action-item extraction, Memory Explorer, Team Pulse, AI-assisted contextual retrieval, source citations, links to original content, and third-party integrations.</p>
              <p>The Service is continually evolving. Features may be added, modified, limited, or discontinued as the platform develops.</p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">4. Third-Party Integrations</h2>
              <p>LOCUS AI may allow users to connect supported third-party services, including Slack, Gmail, and Notion.</p>
              <p>By connecting a third-party service, you authorize LOCUS AI to access and process the information permitted through that integration to the extent necessary to provide the Service.</p>
              <p>Your use of third-party platforms remains subject to the applicable terms, privacy policies, permissions, and availability of those providers.</p>
              <p>LOCUS AI is not responsible for changes, interruptions, restrictions, failures, or discontinuation of third-party services or APIs.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">5. Read-Only Access</h2>
              <p>Where supported, LOCUS AI integrations operate using read-only authorization permissions.</p>
              <p>LOCUS AI does not use these integrations to send emails, post messages, edit documents, or otherwise modify source content unless such functionality is introduced in the future and is clearly disclosed and authorized by the user.</p>
              <p>Users are responsible for reviewing the permissions requested when connecting an integration.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">6. Customer and Workspace Data</h2>
              <p>You retain ownership of the data, documents, communications, and other information that you or your organization make available to LOCUS AI (“Customer Data”).</p>
              <p>You grant LOCUS AI a limited right to access, process, store, transform, and use Customer Data only as reasonably necessary to provide and operate the Service.</p>
              <p>This may include generating structured organizational memory, performing contextual retrieval, maintaining security, preventing abuse, troubleshooting technical issues, providing customer support, and improving the reliability of the Service.</p>
              <p>This permission does not transfer ownership of Customer Data to LOCUS AI.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">7. Raw Message Retention</h2>
              <p>LOCUS AI is designed to minimize the retention of original workspace content.</p>
              <p>Raw message content processed by LOCUS AI may be retained for a maximum period of 30 days, after which it is deleted in accordance with our applicable data-retention processes.</p>
              <p>After the applicable retention period, LOCUS AI may retain structured or derived memory records necessary to provide the Service rather than retaining the complete original message thread.</p>
              <p>Structured records may include contextual summaries, decisions, action items, owners, relevant entities, dates, supporting references, and source metadata.</p>
              <p>Additional information regarding data retention and deletion may be provided in the LOCUS AI Privacy Policy.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">8. No AI Model Training on Workspace Data</h2>
              <p>LOCUS AI does not use private Customer Data or workspace content to train general-purpose artificial intelligence or foundation models.</p>
              <p>Customer Data is processed only as necessary to provide the functionality requested by the user, subject to these Terms and the LOCUS AI Privacy Policy.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">9. Sensitive Information Protection</h2>
              <p>LOCUS AI uses automated safeguards designed to identify and filter certain categories of sensitive information before structured memory records are stored.</p>
              <p>These safeguards may include detection of Social Security numbers, credit and debit card numbers, bank account numbers, routing numbers, international bank account numbers, and other selected financial identifiers.</p>
              <p>Automated detection systems cannot guarantee the identification of every sensitive data element.</p>
              <p>Users should avoid intentionally submitting highly sensitive information unless it is necessary for an authorized use of the Service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">10. Data Security</h2>
              <p>LOCUS AI uses reasonable administrative, technical, and organizational safeguards designed to protect information processed through the Service.</p>
              <p>However, no internet-based service, software platform, or electronic storage system can guarantee absolute security.</p>
              <p>Users and organizations remain responsible for maintaining appropriate security practices relating to account access, permissions, devices, credentials, and connected third-party services.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">11. Acceptable Use</h2>
              <p>You may not use LOCUS AI to violate applicable laws or regulations, access information without authorization, infringe intellectual property or privacy rights, distribute malicious software, compromise the security of the Service, circumvent authentication or authorization controls, conduct unauthorized security testing, scrape or exploit the Service in an unauthorized manner, or facilitate fraudulent, deceptive, abusive, or unlawful activity.</p>
              <p>You may not provide or process another person’s or organization’s data through LOCUS AI unless you have appropriate authorization to do so.</p>
              <p>We may investigate suspected violations and restrict or suspend access where reasonably necessary to protect LOCUS AI, our users, third parties, or the integrity of the Service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">12. Artificial Intelligence Features</h2>
              <p>LOCUS AI uses artificial intelligence, machine learning, retrieval systems, and large language models to provide certain features.</p>
              <p>AI-generated summaries, extracted context, classifications, recommendations, and other outputs may occasionally be incomplete, inaccurate, outdated, or incorrect.</p>
              <p>Users should independently verify important information before relying on AI-generated outputs for significant business, financial, legal, regulatory, employment, healthcare, security, or operational decisions.</p>
              <p>LOCUS AI does not guarantee that AI-generated outputs will always be accurate, complete, or suitable for a particular purpose.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">13. Intellectual Property</h2>
              <p>The LOCUS AI Service, including its software, interfaces, features, workflows, branding, design, documentation, architecture, trademarks, logos, and original content, is owned by LOCUS AI or its licensors and is protected by applicable intellectual property laws.</p>
              <p>Except for the limited right to access and use the Service under these Terms, no intellectual property rights are transferred to you.</p>
              <p>You may not reproduce, distribute, sell, license, copy, modify, or create derivative works from proprietary LOCUS AI materials except where expressly authorized by LOCUS AI or permitted by applicable law.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">14. Feedback</h2>
              <p>If you provide suggestions, recommendations, ideas, or product feedback regarding LOCUS AI, you permit us to use that feedback to develop, improve, and operate the Service.</p>
              <p>Providing feedback does not transfer ownership of your Customer Data to LOCUS AI.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">15. Service Availability</h2>
              <p>We aim to provide a reliable Service but do not guarantee uninterrupted, continuous, or error-free availability.</p>
              <p>The Service may occasionally be unavailable due to maintenance, infrastructure issues, security events, third-party interruptions, API restrictions, system upgrades, or circumstances outside our reasonable control.</p>
              <p>LOCUS AI may modify, suspend, or discontinue portions of the Service when reasonably necessary.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">16. Beta and Early Access Features</h2>
              <p>Certain LOCUS AI features may be offered as beta, preview, pilot, experimental, or early access functionality.</p>
              <p>These features may contain errors or limitations, change without notice, become temporarily unavailable, operate differently from future production versions, or be discontinued.</p>
              <p>Unless otherwise stated, beta and early access features are provided primarily for evaluation, testing, and feedback.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">17. Pilot & Early Access Program</h2>
              <p>LOCUS AI may provide selected users with temporary access to the Service as part of a limited pilot, beta, or early-access program.</p>
              <p>For the current pilot:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Access is provided free of charge.</li>
                <li>Participation is limited to selected early-access users.</li>
                <li>Each pilot user receives access for 7 days, unless otherwise communicated.</li>
                <li>Each user may submit up to 250 prompts during the pilot period.</li>
                <li>Unused prompts expire at the end of the pilot period and have no monetary value.</li>
                <li>Pilot access is provided for product evaluation, testing, and feedback purposes.</li>
                <li>LOCUS AI may modify, restrict, pause, or discontinue pilot functionality during the evaluation period where reasonably necessary.</li>
                <li>Certain features may be experimental, incomplete, or subject to change before commercial release.</li>
                <li>Participation in the pilot does not guarantee continued, free, or future access to LOCUS AI.</li>
                <li>Any future paid plans, pricing, usage limits, or commercial terms will be communicated separately and will not apply retroactively to the free pilot.</li>
              </ul>
              <p>Users are encouraged to provide feedback regarding functionality, usability, reliability, and potential improvements. LOCUS AI may use such feedback to improve and develop the Service in accordance with these Terms.</p>
              <p>Nothing in the pilot program transfers ownership of a user’s or organization’s Customer Data to LOCUS AI.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">18. Suspension and Termination</h2>
              <p>You may stop using LOCUS AI at any time.</p>
              <p>LOCUS AI may suspend or terminate your access if you materially breach these Terms, create a security or legal risk, engage in fraudulent or abusive activity, or if suspension or termination is required by law.</p>
              <p>We may also restrict access where continued use could materially harm LOCUS AI, our infrastructure, other users, or third parties.</p>
              <p>Where reasonably practicable, we may provide notice before suspension or termination.</p>
              <p>Upon termination, your right to access and use the Service will cease.</p>
              <p>Provisions that by their nature should survive termination, including intellectual property protections, disclaimers, limitations of liability, and applicable legal obligations, will continue to apply.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">19. Disconnecting Integrations and Data Deletion</h2>
              <p>Users may disconnect supported integrations through available account or integration controls.</p>
              <p>When an integration is disconnected, LOCUS AI will stop obtaining new information from that integration unless it is subsequently reauthorized.</p>
              <p>Requests relating to account deletion or stored data may be submitted through available account controls or by contacting LOCUS AI.</p>
              <p>Certain information may be retained for limited periods where reasonably necessary for security, fraud prevention, legal compliance, dispute resolution, backup, or recovery purposes, subject to applicable law and the LOCUS AI Privacy Policy.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">20. Disclaimer of Warranties</h2>
              <p>To the maximum extent permitted by applicable law, the Service is provided “as is” and “as available.”</p>
              <p>LOCUS AI makes no express or implied warranty regarding uninterrupted availability, error-free operation, the accuracy or completeness of AI-generated outputs, fitness for a particular purpose, merchantability, non-infringement, or compatibility with every third-party platform or service.</p>
              <p>Your use of LOCUS AI is at your own risk.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">21. Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law, LOCUS AI and its founders, officers, directors, employees, contractors, affiliates, agents, licensors, and service providers will not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages arising from or relating to your use of the Service.</p>
              <p>This includes damages resulting from loss of profits, revenue, business opportunities, goodwill, data, service availability, unauthorized access, reliance on AI-generated information, or inability to access or use the Service.</p>
              <p>Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">22. Indemnification</h2>
              <p>To the extent permitted by applicable law, you agree to indemnify and hold harmless LOCUS AI and its affiliates, officers, directors, employees, contractors, and agents from claims, liabilities, damages, losses, and reasonable expenses arising from your unlawful use of the Service, material violation of these Terms, infringement of third-party rights, or submission of data that you were not authorized to provide or process.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">23. Privacy</h2>
              <p>Your use of LOCUS AI is also subject to the LOCUS AI Privacy Policy, which describes how information is collected, processed, retained, protected, and deleted.</p>
              <p>Additional data-processing terms may be provided to enterprise customers where applicable.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">24. Changes to These Terms</h2>
              <p>LOCUS AI may update these Terms from time to time to reflect changes to the Service, applicable laws, security requirements, business practices, or third-party integrations.</p>
              <p>If material changes are made, we will take reasonable steps to notify users before the updated Terms take effect where appropriate.</p>
              <p>The “Last Updated” date at the beginning of these Terms indicates the most recent revision.</p>
              <p>Your continued use of the Service after revised Terms become effective constitutes acceptance of the revised Terms.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">25. Severability</h2>
              <p>If any provision of these Terms is found to be unlawful, invalid, or unenforceable, that provision will be modified or interpreted to the minimum extent necessary, and the remaining provisions will continue in full force and effect.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">26. Entire Agreement</h2>
              <p>These Terms, together with the LOCUS AI Privacy Policy and any other agreements expressly incorporated by reference, constitute the agreement between you and LOCUS AI regarding your use of the Service.</p>
              <p>For enterprise customers, a separately executed agreement, Master Services Agreement, Data Processing Agreement, or similar contract may supersede specific provisions of these Terms.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[1.3rem] font-semibold text-foreground">27. Contact Us</h2>
              <p>If you have questions about these Terms, privacy practices, data handling, or the LOCUS AI Service, please contact Locus AI email at shubhamshrivastava@locusaiapp.com</p>
            </section>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-8">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto')}
            >
              DECLINE
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: 'lg' }), 'w-full bg-citation text-white hover:bg-citation/90 sm:w-auto')}
            >
              I AGREE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
