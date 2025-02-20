import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
import theme from '../../theme';

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome5 name="user-alt" size={20} color={theme.colors.placeholder} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Full Name" value={'Name'} editable={false} />
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome5 name="envelope" size={20} color={theme.colors.placeholder} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email" value={'PNF@gmail.com'} editable={false} />
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome5 name="home" size={20} color={theme.colors.placeholder} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Address" value={'New PNF Address'} editable={false} />
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome5 name="phone" size={20} color={theme.colors.placeholder} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Phone" value={'8220xxxx89'} editable={false} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  headerText: {
    color: theme.colors.buttonText,
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
  container_Inputfield: {
    flexDirection: 'row',
    height: 40,
    borderColor: theme.colors.placeholder,
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: theme.colors.cardBackground,
  },
  icon: {
    paddingLeft: 5,
    paddingTop: 7,
  },
  input: {
    paddingLeft: 7,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    width: '93%',
    alignSelf: 'center',
    paddingVertical: 12,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.buttonText,
    alignSelf: 'center',
    fontFamily: theme.fonts.semiBold,
  },
});
