// screens/EditProfileScreen.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ route, navigation }) => {
  const { profile, onSave } = route.params;
  const [editedProfile, setEditedProfile] = useState({...profile});
  const [showInterestInputs, setShowInterestInputs] = useState(false);
  const [newInterest, setNewInterest] = useState({ name: '', icon: 'star' });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your photos to change your profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedProfile({
        ...editedProfile,
        profilePicture: result.assets[0].uri
      });
    }
  };

  const addInterest = () => {
    if (newInterest.name.trim() === '') {
      Alert.alert("Error", "Interest name cannot be empty");
      return;
    }

    const newId = Math.max(...editedProfile.interests.map(i => i.id), 0) + 1;
    
    setEditedProfile({
      ...editedProfile,
      interests: [
        ...editedProfile.interests,
        {
          id: newId,
          name: newInterest.name,
          icon: newInterest.icon
        }
      ]
    });
    
    setNewInterest({ name: '', icon: 'star' });
    setShowInterestInputs(false);
  };

  const removeInterest = (id) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(interest => interest.id !== id)
    });
  };

  const handleSave = () => {
    // Validate the profile data
    if (!editedProfile.firstName.trim() || !editedProfile.lastName.trim()) {
      Alert.alert("Error", "First name and last name are required");
      return;
    }

    onSave(editedProfile);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileImageSection}>
          <Image 
            source={{ uri: editedProfile.profilePicture }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
            <MaterialIcons name="camera-alt" size={18} color="white" />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput 
            style={styles.textInput}
            value={editedProfile.firstName}
            onChangeText={(text) => setEditedProfile({...editedProfile, firstName: text})}
            placeholder="First Name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput 
            style={styles.textInput}
            value={editedProfile.lastName}
            onChangeText={(text) => setEditedProfile({...editedProfile, lastName: text})}
            placeholder="Last Name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput 
            style={[styles.textInput, styles.bioInput]}
            value={editedProfile.bio}
            onChangeText={(text) => setEditedProfile({...editedProfile, bio: text})}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.interestsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowInterestInputs(!showInterestInputs)}
            >
              <MaterialIcons 
                name={showInterestInputs ? "remove" : "add"} 
                size={18} 
                color="white" 
              />
            </TouchableOpacity>
          </View>

          {showInterestInputs && (
            <View style={styles.addInterestContainer}>
              <TextInput 
                style={[styles.textInput, styles.interestInput]}
                value={newInterest.name}
                onChangeText={(text) => setNewInterest({...newInterest, name: text})}
                placeholder="Interest Name"
              />
              <View style={styles.iconSelectorContainer}>
                {['star', 'code', 'paint-brush', 'music', 'book', 'film', 'camera'].map((icon) => (
                  <TouchableOpacity 
                    key={icon}
                    style={[
                      styles.iconOption,
                      newInterest.icon === icon && styles.selectedIconOption
                    ]}
                    onPress={() => setNewInterest({...newInterest, icon})}
                  >
                    <MaterialIcons name={icon === 'paint-brush' ? 'brush' : icon} size={16} color={newInterest.icon === icon ? "white" : "#0077B5"} />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.addInterestButton}
                onPress={addInterest}
              >
                <Text style={styles.addInterestButtonText}>Add Interest</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.interestsList}>
            {editedProfile.interests.map((interest) => (
              <View key={interest.id} style={styles.interestItem}>
                <MaterialIcons name={interest.icon === 'paint-brush' ? 'brush' : interest.icon} size={18} color="#0077B5" />
                <Text style={styles.interestName}>{interest.name}</Text>
                <TouchableOpacity 
                  style={styles.removeInterestButton}
                  onPress={() => removeInterest(interest.id)}
                >
                  <MaterialIcons name="close" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077B5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  changePhotoText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  interestsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#0077B5',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addInterestContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  interestInput: {
    marginBottom: 10,
  },
  iconSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  iconOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#0077B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIconOption: {
    backgroundColor: '#0077B5',
  },
  addInterestButton: {
    backgroundColor: '#0077B5',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  addInterestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7fb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestName: {
    marginLeft: 8,
    marginRight: 5,
    color: '#0077B5',
  },
  removeInterestButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#0077B5',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;   
