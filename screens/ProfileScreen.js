// screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Share
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_PROFILE = {
  firstName: 'Thandeka ',
  lastName: 'Mazibuko',
  profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKBGbVjgsbiJhf0OorySkWsT0sBVoYy1P5Fw&s',
  bio: 'Senior Software Engineer with 6+ years of experience in React Native and mobile development.',
  interests: [
    { id: 1, name: 'React Native', icon: 'react' },
    { id: 2, name: 'UX Design', icon: 'paint-brush' },
    { id: 3, name: 'AI', icon: 'microchip' },
    { id: 4, name: 'Hiking', icon: 'tree' },
    { id: 5, name: 'Photography', icon: 'camera' },
  ],
  connections: 487,
  views: 132,
  achievements: [
    { id: 1, title: 'Top Mobile Developer', year: '2023' },
    { id: 2, title: 'React Native Mentor', year: '2022' },
  ],
  skills: [
    { id: 1, name: 'React Native', level: 95 },
    { id: 2, name: 'JavaScript', level: 90 },
    { id: 3, name: 'UI/UX Design', level: 85 },
    { id: 4, name: 'TypeScript', level: 80 },
  ],
  education: [
    { id: 1, school: 'Stanford University', degree: 'Master of Computer Science', year: '2017-2019' },
    { id: 2, school: 'MIT', degree: 'Bachelor of Science in Computer Engineering', year: '2013-2017' },
    { id: 3, school: 'Online Learning', degree: 'Advanced Mobile Development Certification', year: '2021' }
  ]
};

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [showSkillsDetails, setShowSkillsDetails] = useState(false);
  const { width } = Dimensions.get('window');

  // Skill bar animation
  const skillBarWidths = profile.skills.map((skill) => 
    (skill.level / 100) * (width - 100)
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${profile.firstName} ${profile.lastName}'s professional profile!`,
        title: 'Share Professional Profile',
      });
    } catch (error) {
      console.log('Error sharing profile:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#0077B5', '#00A0DC']}
          style={styles.headerGradient}
        >
              <View style={styles.topRightActions}>
    <TouchableOpacity 
      style={styles.iconButton}
      onPress={() => navigation.navigate('EditProfile', { 
        profile,
        onSave: (updatedProfile) => setProfile(updatedProfile)
      })}
    >
      <MaterialIcons name="edit" size={22} color="white" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
      <Ionicons name="share-social-outline" size={22} color="white" />
    </TouchableOpacity>
  </View>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: profile.profilePicture }} 
              style={styles.profileImage} 
            />
          </View>
          <Text style={styles.name}>
            {profile.firstName} {profile.lastName}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.connections}</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.views}</Text>
              <Text style={styles.statLabel}>Profile Views</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{profile.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {profile.interests.map(interest => (
              <View key={interest.id} style={styles.interestItem}>
                <FontAwesome name={interest.icon} size={24} color="#0077B5" />
                <Text style={styles.interestText}>{interest.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {profile.education.map(edu => (
            <View key={edu.id} style={styles.educationItem}>
              <MaterialIcons name="school" size={24} color="#0077B5" />
              <View style={styles.educationDetails}>
                <Text style={styles.schoolName}>{edu.school}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.year}>{edu.year}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {profile.achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementItem}>
              <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
              <View style={styles.achievementDetails}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementYear}>{achievement.year}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.skillsHeader} 
            onPress={() => setShowSkillsDetails(!showSkillsDetails)}
          >
            <Text style={styles.sectionTitle}>Skills</Text>
            <MaterialIcons 
              name={showSkillsDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color="#0077B5" 
            />
          </TouchableOpacity>
          
          {showSkillsDetails && (
            <View style={styles.skillsContainer}>
              {profile.skills.map((skill, index) => (
                <View key={skill.id} style={styles.skillItem}>
                  <View style={styles.skillInfo}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <Text style={styles.skillPercent}>{skill.level}%</Text>
                  </View>
                  <View style={styles.skillBarBackground}>
                    <View 
                      style={[
                        styles.skillBarFill, 
                        { width: skillBarWidths[index] }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Add some spacing at the bottom for scrolling */}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Floating action button (FAB) for quick actions */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
  },
  headerGradient: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: 'green',
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
    marginTop: 10,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    width: '80%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: 'white',
    fontSize: 12,
  },
  statDivider: {
    height: '80%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  topRightActions: {
    position: 'absolute',
    flexDirection: 'row',
    right: 15,
    top: 10,
    zIndex: 10,
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    padding: 8,
    borderRadius: 20,
  },
  
  section: {
    paddingHorizontal:8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bioText: {
    color: '#666',
    lineHeight: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    marginLeft: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementDetails: {
    marginLeft: 10,
  },
  achievementTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  achievementYear: {
    color: '#666',
    fontSize: 12,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  educationDetails: {
    marginLeft: 10,
    flex: 1,
  },
  schoolName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  degree: {
    color: '#555',
    fontSize: 14,
    marginTop: 2,
  },
  year: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillItem: {
    marginBottom: 15,
  },
  skillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  skillName: {
    color: '#333',
    fontWeight: '500',
  },
  skillPercent: {
    color: '#0077B5',
    fontWeight: 'bold',
  },
  skillBarBackground: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  skillBarFill: {
    height: 8,
    backgroundColor: '#0077B5',
    borderRadius: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0077B5',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default ProfileScreen;