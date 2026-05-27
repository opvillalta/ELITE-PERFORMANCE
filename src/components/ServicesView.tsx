/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Flame, Wind, Droplets, Thermometer, Clock, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, Button } from './ui';
import { GroupClass, Amenity, ServiceBooking } from '../types';

interface ServicesViewProps {
  classes: GroupClass[];
  amenities: Amenity[];
  bookings: ServiceBooking[];
  onBookClass: (classItem: GroupClass) => void;
  onUseAmenity: (amenity: Amenity) => void;
}

export default function ServicesView({ classes, amenities, bookings, onBookClass, onUseAmenity }: ServicesViewProps) {
  const [activeSection, setActiveSection] = useState<'classes' | 'amenities'>('classes');

  // Check if a class is already booked
  const isClassBooked = (classId: string) => {
    return bookings.some(b => b.type === 'class' && b.serviceId === classId);
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermedio': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Avanzado': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-white/60 bg-white/10 border-white/20';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Spinning': return <Flame className="w-4 h-4" />;
      case 'Yoga': return <Wind className="w-4 h-4" />;
      case 'Zumba': return <Users className="w-4 h-4" />;
      case 'HIIT': return <Flame className="w-4 h-4" />;
      case 'Pilates': return <Wind className="w-4 h-4" />;
      case 'Box': return <Users className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  // Get amenity icon
  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'Sauna': return <Thermometer className="w-5 h-5" />;
      case 'Vapor': return <Wind className="w-5 h-5" />;
      case 'Jacuzzi': return <Droplets className="w-5 h-5" />;
      case 'Piscina': return <Droplets className="w-5 h-5" />;
      case 'Baño Turco': return <Wind className="w-5 h-5" />;
      default: return <Thermometer className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto text-white bg-black min-h-screen pb-28 font-sans overflow-y-auto overflow-x-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BFFF00]/5 blur-[120px] rounded-full"></div>

      {/* Header */}
      <div className="px-6 pt-6 pb-2 text-left relative z-10">
        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Actividades extra</p>
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase mt-1">
          SERVICIOS
        </h2>
      </div>

      {/* Section Tabs */}
      <div className="px-5 py-4 relative z-10">
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveSection('classes')}
            variant={activeSection === 'classes' ? 'primary' : 'ghost'}
            size="sm"
            className="flex-1 justify-center"
          >
            <Calendar className="w-4 h-4" />
            Clases Grupales
          </Button>
          <Button
            onClick={() => setActiveSection('amenities')}
            variant={activeSection === 'amenities' ? 'primary' : 'ghost'}
            size="sm"
            className="flex-1 justify-center"
          >
            <Thermometer className="w-4 h-4" />
            Amenidades
          </Button>
        </div>
      </div>

      <div className="px-5 space-y-4 relative z-10 pb-4">
        {activeSection === 'classes' ? (
          // CLASSES SECTION
          <>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                Clases disponibles esta semana
              </h3>
            </motion.div>

            {classes.map((classItem, index) => {
              const isBooked = isClassBooked(classItem.id);
              const spotsLeft = classItem.capacity - classItem.enrolledCount;

              return (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-[#1C1C1E] border-white/5 rounded-2xl p-4 space-y-3">
                    {/* Class Header */}
                    <div className="flex gap-3">
                      <div 
                        className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${classItem.image})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-base font-black text-white tracking-tight truncate">
                            {classItem.name}
                          </h4>
                          {isBooked && (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-white/50 font-medium truncate">
                          {classItem.instructor}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyColor(classItem.difficulty)}`}>
                            {classItem.difficulty}
                          </span>
                          <span className="text-[10px] text-white/40 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {classItem.durationMin} min
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Schedule & Capacity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-white/60">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs font-medium">{classItem.schedule.dayOfWeek}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-medium">{classItem.schedule.time}</span>
                        </div>
                      </div>
                      <div className={`text-xs font-bold ${spotsLeft <= 3 ? 'text-red-400' : 'text-white/60'}`}>
                        {spotsLeft} lugares
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-white/40 font-normal leading-relaxed">
                      {classItem.description}
                    </p>

                    {/* Action Button */}
                    <Button
                      onClick={() => onBookClass(classItem)}
                      variant={isBooked ? 'ghost' : 'primary'}
                      size="sm"
                      className="w-full justify-center"
                      disabled={!isBooked && spotsLeft === 0}
                    >
                      {isBooked ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          INSCRITO
                        </>
                      ) : spotsLeft === 0 ? (
                        'CLASE LLENA'
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          INSCRIBIRSE
                        </>
                      )}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </>
        ) : (
          // AMENITIES SECTION
          <>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                Amenidades del gimnasio
              </h3>
            </motion.div>

            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#1C1C1E] border-white/5 rounded-2xl p-4 space-y-3">
                  {/* Amenity Header */}
                  <div className="flex gap-3">
                    <div 
                      className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${amenity.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-base font-black text-white tracking-tight truncate">
                          {amenity.name}
                        </h4>
                        {amenity.available ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <p className="text-xs text-white/50 font-medium">
                        {amenity.type}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {amenity.temperature && (
                          <span className="text-[10px] text-white/40 font-medium flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            {amenity.temperature}
                          </span>
                        )}
                        <span className="text-[10px] text-white/40 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {amenity.schedule}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/40 font-normal leading-relaxed">
                    {amenity.description}
                  </p>

                  {/* Action Button */}
                  <Button
                    onClick={() => onUseAmenity(amenity)}
                    variant={amenity.available ? 'primary' : 'ghost'}
                    size="sm"
                    className="w-full justify-center"
                    disabled={!amenity.available}
                  >
                    {amenity.available ? (
                      <>
                        <Droplets className="w-4 h-4" />
                        REGISTRAR USO
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        NO DISPONIBLE
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}