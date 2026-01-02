import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Colecciones de Firestore
const COLLECTIONS = {
  USERS: 'users',
  PRAYER_REQUESTS: 'prayerRequests',
  EVENTS: 'events',
  MINISTRIES: 'ministries',
  DAILY_VERSES: 'dailyVerses',
  TESTIMONIES: 'testimonies',
};

// Servicio de Usuarios
export const userService = {
  // Crear usuario en Firestore (después de auth)
  async createUser(userData) {
    try {
      const userRef = await addDoc(collection(db, COLLECTIONS.USERS), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        role: 'member',
        isActive: true,
        emailVerified: false,
      });

      return { id: userRef.id, ...userData };
    } catch (error) {
      console.error('Error creating user in Firestore:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  async getUser(userId) {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Actualizar usuario
  async updateUser(userId, data) {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Buscar usuario por email
  async findUserByEmail(email) {
    try {
      const q = query(
        collection(db, COLLECTIONS.USERS),
        where('email', '==', email.toLowerCase()),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },
};

// Servicio de Pedidos de Oración
export const prayerService = {
  async createRequest(requestData) {
    try {
      const requestRef = await addDoc(
        collection(db, COLLECTIONS.PRAYER_REQUESTS),
        {
          ...requestData,
          status: 'pending',
          createdAt: serverTimestamp(),
          prayedAt: null,
          isPublic: requestData.allowSharing || false,
        }
      );

      return { id: requestRef.id, ...requestData };
    } catch (error) {
      console.error('Error creating prayer request:', error);
      throw error;
    }
  },

  async getRequests(filters = {}) {
    try {
      let q = collection(db, COLLECTIONS.PRAYER_REQUESTS);

      // Aplicar filtros
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      if (filters.limit) {
        q = query(q, orderBy('createdAt', 'desc'), limit(filters.limit));
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convertir timestamps a fechas legibles
        createdAt: doc.data().createdAt?.toDate?.() || null,
        prayedAt: doc.data().prayedAt?.toDate?.() || null,
      }));
    } catch (error) {
      console.error('Error getting prayer requests:', error);
      throw error;
    }
  },

  async updateRequest(requestId, data) {
    try {
      await updateDoc(doc(db, COLLECTIONS.PRAYER_REQUESTS, requestId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating prayer request:', error);
      throw error;
    }
  },

  async markAsPrayed(requestId) {
    try {
      await this.updateRequest(requestId, {
        status: 'prayed',
        prayedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error marking as prayed:', error);
      throw error;
    }
  },

  async deleteRequest(requestId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PRAYER_REQUESTS, requestId));
    } catch (error) {
      console.error('Error deleting prayer request:', error);
      throw error;
    }
  },
};

// Servicio de Eventos
export const eventService = {
  async createEvent(eventData) {
    try {
      const eventRef = await addDoc(collection(db, COLLECTIONS.EVENTS), {
        ...eventData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        attendees: [],
        isActive: true,
      });

      return { id: eventRef.id, ...eventData };
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async getUpcomingEvents(limitCount = 5) {
    try {
      const q = query(
        collection(db, COLLECTIONS.EVENTS),
        where('isActive', '==', true),
        orderBy('date', 'asc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate?.() || doc.data().date,
      }));
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  },

  async getAllEvents() {
    try {
      const q = query(
        collection(db, COLLECTIONS.EVENTS),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error getting all events:', error);
      throw error;
    }
  },
};

// Servicio de Ministerios
export const ministryService = {
  async getMinistries() {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.MINISTRIES));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting ministries:', error);
      throw error;
    }
  },

  async getMinistryById(ministryId) {
    try {
      const ministryDoc = await getDoc(
        doc(db, COLLECTIONS.MINISTRIES, ministryId)
      );
      return ministryDoc.exists()
        ? { id: ministryDoc.id, ...ministryDoc.data() }
        : null;
    } catch (error) {
      console.error('Error getting ministry:', error);
      throw error;
    }
  },
};

// Servicio de Testimonios
export const testimonyService = {
  async createTestimony(testimonyData) {
    try {
      const testimonyRef = await addDoc(
        collection(db, COLLECTIONS.TESTIMONIES),
        {
          ...testimonyData,
          createdAt: serverTimestamp(),
          approved: false,
          likes: 0,
        }
      );

      return { id: testimonyRef.id, ...testimonyData };
    } catch (error) {
      console.error('Error creating testimony:', error);
      throw error;
    }
  },

  async getApprovedTestimonies(limitCount = 10) {
    try {
      const q = query(
        collection(db, COLLECTIONS.TESTIMONIES),
        where('approved', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting testimonies:', error);
      throw error;
    }
  },

  async approveTestimony(testimonyId) {
    try {
      await updateDoc(doc(db, COLLECTIONS.TESTIMONIES, testimonyId), {
        approved: true,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error approving testimony:', error);
      throw error;
    }
  },
};

// Servicio de Estadísticas
export const statsService = {
  async getDashboardStats() {
    try {
      // Obtener conteos
      const [users, prayers, events, testimonies] = await Promise.all([
        getDocs(collection(db, COLLECTIONS.USERS)),
        getDocs(collection(db, COLLECTIONS.PRAYER_REQUESTS)),
        getDocs(
          query(
            collection(db, COLLECTIONS.EVENTS),
            where('isActive', '==', true)
          )
        ),
        getDocs(
          query(
            collection(db, COLLECTIONS.TESTIMONIES),
            where('approved', '==', true)
          )
        ),
      ]);

      const pendingPrayers = await getDocs(
        query(
          collection(db, COLLECTIONS.PRAYER_REQUESTS),
          where('status', '==', 'pending')
        )
      );

      return {
        totalUsers: users.size,
        totalPrayers: prayers.size,
        pendingPrayers: pendingPrayers.size,
        upcomingEvents: events.size,
        testimonies: testimonies.size,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  },
};
