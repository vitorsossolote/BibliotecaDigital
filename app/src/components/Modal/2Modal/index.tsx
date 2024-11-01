import React,{ useState } from 'react';
import { Link, Modal, Center, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText, VStack, Heading, Text, Input, InputField, HStack, SafeAreaView } from '@gluestack-ui/themed';
import { Pressable, View, StyleSheet} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

interface Props{
    ButtonTitle : String;
    ModalTitle: String;
    ModalTitle2: String;
    ModalSubtitle2: String;
    Type:String
};
const ModalComp2 = ({ButtonTitle,ModalTitle,ModalTitle2,ModalSubtitle2,Type}:Props) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    return (
        <SafeAreaView>
            <View>
                <Button onPress={() => {
                    setShowModal(true);
                }}
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.buttonSolid}
                >
                    <ButtonText>{ButtonTitle}</ButtonText>
                </Button>
            </View>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader borderBottomWidth='$0'>
                        <VStack space='sm'>
                            <Heading size='lg'>{ModalTitle}</Heading>
                            <Text size='sm'>A [Nome da Biblioteca] valoriza sua privacidade. Coletamos informações como nome, e-mail, livros lidos e dados do dispositivo para melhorar nossos serviços e personalizar sua experiência. Não vendemos suas informações e as compartilhamos apenas com prestadores de serviços ou conforme exigido por lei. Implementamos medidas de segurança para proteger seus dados. Você pode solicitar a exclusão de suas informações a qualquer momento. Para dúvidas, entre em contato conosco pelo e-mail [email de contato].</Text>
                        </VStack>
                    </ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter borderTopWidth='$0'>
                        <VStack space='lg' w='$full'>
                            <Button
                                onPress={() => {
                                    setShowModal2(true);
                                }} backgroundColor='#EE2D32'
                            >
                                <ButtonText>Concordo com os termos</ButtonText>
                            </Button>
                            <HStack>
                                <Button
                                    variant='link'
                                    size='sm'
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    <ButtonText color="#EE2D32" >Voltar</ButtonText>
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
          isOpen={showModal2}
          onClose={() => {
            setShowModal2(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader borderBottomWidth='$0'>
            <VStack space='sm'>
              <Heading size='lg'>{ModalTitle2}</Heading>
              <Text size='sm'>{ModalSubtitle2}</Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <OtpInput
                numberOfDigits={6}
                onTextChange={(text) => console.log(text)}
                focusColor={"#ee2d32"}
                focusStickBlinkingDuration={400}
              />
            </ModalBody>
            <ModalFooter borderTopWidth='$0'>
            <VStack space='lg' w='$full'>
              <Button backgroundColor='#EE2D32'
                onPress={() => {
                  setShowModal3(true);
                  
                }}
              >
                <ButtonText>Continuar</ButtonText>
              </Button>
              <View style={styles.linkContainer}>
              <Text size='sm'>Não recebeu o {Type}</Text>
              <Button style={styles.reenviar}
                  variant='link'
                  size='sm'
                  onPress={() => {
                    console.log("codigo reenviado");
                  }}
                >
                  <ButtonText color="#EE2D32">Reenviar</ButtonText>
                </Button>
              </View>
                <Button
                  variant='link'
                  size='sm'
                  onPress={() => {
                    setShowModal2(false);
                  }}
                >
                  <ButtonText color="#EE2D32">Voltar</ButtonText>
                </Button>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
    linkContainer:{
      marginLeft:10,
      marginTop:10,
      flexDirection:'row',
    },
    reenviar:{
      marginLeft:10,
      bottom:8
    },
});
export default ModalComp2;