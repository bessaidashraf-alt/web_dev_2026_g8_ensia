# Team G8 -- Task Plan (Lab 2)

Project: **Unipedia** -- University Residence Services Platform (Fix It, Money Request, Skills Exchange)

## Team members

| Member | GitHub username | Role |
|--------|-----------------|------|
| Member 1 | @user1 | Coordinator, template, home, authentication pages |
| Member 2 | @user2 | Student dashboard and Fix It (student) |
| Member 3 | @user3 | Fix It details and Staff pages |
| Member 4 | @user4 | Money Request and Admin dashboard |
| Member 5 | @user5 | Skills Exchange and Admin users |

## Profiles

- **Student**: residence student, uses Fix It, Money Request and Skills Exchange.
- **Staff**: residence maintenance administration, handles Fix It reports.
- **Admin**: platform owner (a team member), manages user accounts.

## Site map

![Site map](docs/sitemap.png)

## Conventions

- Folders: HTML pages at the root, `docs/` for documentation and images.
- File names: lowercase, hyphens, English (example: `fixit-new.html`).
- Every page starts from `template.html` (header with navigation, main, footer).
- Branches: `page/<page-name>` (example: `page/money-new`).
- Commit messages: imperative (example: "Add money request form").
- Each page has one owner and a different reviewer; a page is merged only after the reviewer approves its pull request.
- Only edit your own pages and your own row in this file.

## Pages

| Page | File | Profile | Owner | Reviewer | Status |
|------|------|---------|-------|----------|--------|
| Template | template.html | all | @user1 | @user2 | To do |
| Home | index.html | all | @user1 | @user2 | To do |
| Login (form) | login.html | all | @user1 | @user2 | To do |
| Sign up (form) | signup.html | all | @user1 | @user2 | To do |
| Student dashboard | dashboard.html | student | @user2 | @user3 | To do |
| Fix It: new report (form) | fixit-new.html | student | @user2 | @user3 | To do |
| Fix It: my reports (table) | fixit-reports.html | student | @user2 | @user3 | To do |
| Fix It: report details | fixit-details.html | student | @user3 | @user4 | To do |
| Staff: maintenance queue (table) | staff-queue.html | staff | @user3 | @user4 | To do |
| Staff: report details and status update (form) | staff-report-details.html | staff | @user3 | @user4 | To do |
| Money: requests (table) | money-requests.html | student | @user4 | @user5 | To do |
| Money: new request (form) | money-new.html | student | @user4 | @user5 | To do |
| Money: request details | money-details.html | student | @user4 | @user5 | To do |
| Admin: dashboard | admin-dashboard.html | admin | @user4 | @user5 | To do |
| Skills: browse | skills.html | student | @user5 | @user1 | To do |
| Skills: new listing (form) | skill-new.html | student | @user5 | @user1 | To do |
| Skills: exchange requests (table) | skill-requests.html | student | @user5 | @user1 | To do |
| Admin: users (table) | admin-users.html | admin | @user5 | @user1 | To do |

Status values: To do , In progress , In review , Done (#PR number).

## Deadlines

- Template pushed: DD/MM/2026
- All pages merged: DD/MM/2026
- Tag `lab2-team` on the final commit: DD/MM/2026

## Confirmation

Each member confirms their assignment by ticking their name:

- [ ] Member 1
- [ ] Member 2
- [ ] Member 3
- [ ] Member 4
- [ ] Member 5
