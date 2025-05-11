// User model
export class User {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || 'student'; // 'student' or 'teacher'
    this.createdAt = data.createdAt || new Date();
  }
  
  // Add model methods here
}
