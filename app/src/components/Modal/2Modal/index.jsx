import { React, useState } from 'react';
import { Link, Modal, Center, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText, VStack, Heading, Text, Input, InputField, HStack, SafeAreaView } from '@gluestack-ui/themed';
import { Pressable, View, StyleSheet} from 'react-native';

interface Props{
    ButtonTitle : String;
    ModalTitle: String;
    ModalTitle2: String;
    ModalSubtitle2: String;

};
const ModalComp2 = ({ButtonTitle,ModalTitle,ModalTitle2,ModalSubtitle2}:Props) => {
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
                            <Text size='sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magnam quasi nemo tempora, vitae rem pariatur. Nam praesentium unde officia quaerat reprehenderit placeat molestias facilis amet cum voluptatem libero, adipisci obcaecati ab minima repellendus sunt exercitationem, ducimus suscipit! Veritatis, facere? Commodi, quidem magnam minus architecto necessitatibus temporibus neque vel, mollitia cumque, reiciendis beatae aliquid ea culpa exercitationem quibusdam. Accusantium hic cupiditate et quis sunt minima incidunt, odio rerum quidem, obcaecati quo reiciendis veritatis ipsa deserunt. Quo praesentium repellendus, sed, sequi blanditiis adipisci nihil iure odio molestias maiores iusto deleniti excepturi repellat eum nam ipsam cumque amet consequuntur unde mollitia? Ipsum!</Text>
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
                                <ButtonText>Li e concordo com n sei oq</ButtonText>
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
              <Input>
                <InputField placeholder="Insira o Código de Verificação" />
              </Input>
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
              <Text size='sm'>Não recebeu o email?
              <Button style={styles.reenviar}
                  variant='link'
                  size='sm'
                  onPress={() => {
                    console.log("codigo reenviado");
                  }}
                >
                  <ButtonText color="#EE2D32">Reenviar</ButtonText>
                </Button>
              </Text>
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
      marginLeft:10
    },
});
export default ModalComp2;