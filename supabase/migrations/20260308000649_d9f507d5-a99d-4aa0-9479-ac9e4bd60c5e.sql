-- Convert ALL RESTRICTIVE RLS policies to PERMISSIVE across all tables
-- This fixes the critical security issue where no data is accessible

-- PROFILES
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- SERVICES
DROP POLICY IF EXISTS "Admins can update any service" ON public.services;
DROP POLICY IF EXISTS "Admins can view all services" ON public.services;
DROP POLICY IF EXISTS "Users can create services" ON public.services;
DROP POLICY IF EXISTS "Users can update their own services" ON public.services;
DROP POLICY IF EXISTS "Users can view their own services" ON public.services;

CREATE POLICY "Admins can update any service" ON public.services FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all services" ON public.services FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create services" ON public.services FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own services" ON public.services FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own services" ON public.services FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- COMPANIES (+ add admin SELECT)
DROP POLICY IF EXISTS "Users can create their own companies" ON public.companies;
DROP POLICY IF EXISTS "Users can delete their own companies" ON public.companies;
DROP POLICY IF EXISTS "Users can update their own companies" ON public.companies;
DROP POLICY IF EXISTS "Users can view their own companies" ON public.companies;

CREATE POLICY "Admins can view all companies" ON public.companies FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create their own companies" ON public.companies FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own companies" ON public.companies FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own companies" ON public.companies FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own companies" ON public.companies FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- DOMAIN_FAVORITES
DROP POLICY IF EXISTS "Users can add favorites" ON public.domain_favorites;
DROP POLICY IF EXISTS "Users can remove favorites" ON public.domain_favorites;
DROP POLICY IF EXISTS "Users can view own favorites" ON public.domain_favorites;

CREATE POLICY "Users can add favorites" ON public.domain_favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.domain_favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own favorites" ON public.domain_favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- USER_ROLES
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Only admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Only admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Only admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role));

-- AFFILIATES
DROP POLICY IF EXISTS "Admins can update affiliates" ON public.affiliates;
DROP POLICY IF EXISTS "Admins can view all affiliates" ON public.affiliates;
DROP POLICY IF EXISTS "Users can create own affiliate" ON public.affiliates;
DROP POLICY IF EXISTS "Users can view own affiliate" ON public.affiliates;

CREATE POLICY "Admins can update affiliates" ON public.affiliates FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all affiliates" ON public.affiliates FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create own affiliate" ON public.affiliates FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own affiliate" ON public.affiliates FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- SERVICE_CATALOG
DROP POLICY IF EXISTS "Admins can manage services" ON public.service_catalog;
DROP POLICY IF EXISTS "Anyone can view active services" ON public.service_catalog;

CREATE POLICY "Admins can manage services" ON public.service_catalog FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active services" ON public.service_catalog FOR SELECT TO authenticated USING (is_active = true);

-- ORDERS
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;

CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- PAYMENTS
DROP POLICY IF EXISTS "Admins can update payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can create payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;

CREATE POLICY "Admins can update payments" ON public.payments FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- DOCUMENTS
DROP POLICY IF EXISTS "Admins can manage documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON public.documents;
DROP POLICY IF EXISTS "Users can create documents" ON public.documents;
DROP POLICY IF EXISTS "Users can delete own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can view own documents" ON public.documents;

CREATE POLICY "Admins can manage documents" ON public.documents FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own documents" ON public.documents FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- AI_PROMPTS
DROP POLICY IF EXISTS "Admins can manage prompts" ON public.ai_prompts;
DROP POLICY IF EXISTS "Anyone can view active prompts" ON public.ai_prompts;

CREATE POLICY "Admins can manage prompts" ON public.ai_prompts FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active prompts" ON public.ai_prompts FOR SELECT TO authenticated USING (is_active = true);

-- AI_USAGE
DROP POLICY IF EXISTS "Admins can view all AI usage" ON public.ai_usage;
DROP POLICY IF EXISTS "Users can create AI usage" ON public.ai_usage;
DROP POLICY IF EXISTS "Users can view own AI usage" ON public.ai_usage;

CREATE POLICY "Admins can view all AI usage" ON public.ai_usage FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create AI usage" ON public.ai_usage FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own AI usage" ON public.ai_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- SUPPORT_TICKETS
DROP POLICY IF EXISTS "Admin and support can update tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Admin and support can view all tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can create tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can update own tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can view own tickets" ON public.support_tickets;

CREATE POLICY "Admin and support can update tickets" ON public.support_tickets FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin and support can view all tickets" ON public.support_tickets FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tickets" ON public.support_tickets FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- TICKET_MESSAGES
DROP POLICY IF EXISTS "Users can create messages on own tickets" ON public.ticket_messages;
DROP POLICY IF EXISTS "Users can view messages of own tickets" ON public.ticket_messages;

CREATE POLICY "Users can create messages on own tickets" ON public.ticket_messages FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id) AND ((EXISTS (SELECT 1 FROM support_tickets WHERE support_tickets.id = ticket_messages.ticket_id AND support_tickets.user_id = auth.uid())) OR has_role(auth.uid(), 'admin'::app_role)));
CREATE POLICY "Users can view messages of own tickets" ON public.ticket_messages FOR SELECT TO authenticated USING ((EXISTS (SELECT 1 FROM support_tickets WHERE support_tickets.id = ticket_messages.ticket_id AND support_tickets.user_id = auth.uid())) OR has_role(auth.uid(), 'admin'::app_role));

-- ACTIVITY_LOGS
DROP POLICY IF EXISTS "Admins can view all logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can view own activity logs" ON public.activity_logs;

CREATE POLICY "Admins can view all logs" ON public.activity_logs FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view own activity logs" ON public.activity_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- REFERRALS
DROP POLICY IF EXISTS "Admins can manage referrals" ON public.referrals;
DROP POLICY IF EXISTS "Admins can view all referrals" ON public.referrals;
DROP POLICY IF EXISTS "Affiliates can view own referrals" ON public.referrals;

CREATE POLICY "Admins can manage referrals" ON public.referrals FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Affiliates can view own referrals" ON public.referrals FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = referrals.affiliate_id AND affiliates.user_id = auth.uid()));

-- DOMAIN_INQUIRIES
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.domain_inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.domain_inquiries;
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.domain_inquiries;
DROP POLICY IF EXISTS "Only admins can select all inquiries" ON public.domain_inquiries;

CREATE POLICY "Admins can update inquiries" ON public.domain_inquiries FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all inquiries" ON public.domain_inquiries FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can create inquiries" ON public.domain_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- AFFILIATE_CLICKS
DROP POLICY IF EXISTS "Admins can view all clicks" ON public.affiliate_clicks;
DROP POLICY IF EXISTS "Affiliates can view own clicks" ON public.affiliate_clicks;
DROP POLICY IF EXISTS "Anyone can create clicks" ON public.affiliate_clicks;

CREATE POLICY "Admins can view all clicks" ON public.affiliate_clicks FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Affiliates can view own clicks" ON public.affiliate_clicks FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_clicks.affiliate_id AND affiliates.user_id = auth.uid()));
CREATE POLICY "Anyone can create clicks" ON public.affiliate_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);

-- PAYMENT_TRANSACTIONS
DROP POLICY IF EXISTS "Admins can update transactions" ON public.payment_transactions;
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.payment_transactions;
DROP POLICY IF EXISTS "Users can create transactions" ON public.payment_transactions;
DROP POLICY IF EXISTS "Users can view own transactions" ON public.payment_transactions;

CREATE POLICY "Admins can update transactions" ON public.payment_transactions FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all transactions" ON public.payment_transactions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create transactions" ON public.payment_transactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON public.payment_transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);