
import { React, useState } from 'react';
import { Link, Modal, Center, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText, VStack, Heading, Text, Input, InputField, HStack, SafeAreaView } from '@gluestack-ui/themed';
import { Pressable, View, StyleSheet} from 'react-native';

type Props = {
  onPress : any
}

const ModalComp = ({onPress} : Props) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <SafeAreaView>
            <View>
                <Button onPress={onPress}
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.buttonSolid}
                    
                >
                    <ButtonText>Criar Conta</ButtonText>
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
                            <Heading size='lg'>Termos e Politicas de privacidade</Heading>
                            <Text size='sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magnam quasi nemo tempora, vitae rem pariatur. Nam praesentium unde officia quaerat reprehenderit placeat molestias facilis amet cum voluptatem libero, adipisci obcaecati ab minima repellendus sunt exercitationem, ducimus suscipit! Veritatis, facere? Commodi, quidem magnam minus architecto necessitatibus temporibus neque vel, mollitia cumque, reiciendis beatae aliquid ea culpa exercitationem quibusdam. Accusantium hic cupiditate et quis sunt minima incidunt, odio rerum quidem, obcaecati quo reiciendis veritatis ipsa deserunt. Quo praesentium repellendus, sed, sequi blanditiis adipisci nihil iure odio molestias maiores iusto deleniti excepturi repellat eum nam ipsam cumque amet consequuntur unde mollitia? Ipsum!</Text>
                        </VStack>
                    </ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter borderTopWidth='$0'>
                        <VStack space='lg' w='$full'>
                            <Button
                                onPress={() => {
                                    console.log("aceitou os termos");
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
            {/* <Modal
          isOpen={showModal2}
          onClose={() => {
            setShowModal2(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader borderBottomWidth='$0'>
            <VStack space='sm'>
              <Heading size='lg'>Reset password</Heading>
              <Text size='sm'>A verification code has been sent to you. Enter code below.</Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <Input>
                <InputField placeholder="Enter verification code" />
              </Input>
            </ModalBody>
            <ModalFooter borderTopWidth='$0'>
            <VStack space='lg' w='$full'>
              <Button
                onPress={() => {
                  setShowModal3(true);
                }}
              >
                <ButtonText>Continue</ButtonText>
              </Button>
              <Text size='sm'>Didn’t receive the email?
                <Link ml='$1'><Link.Text size='sm' 
                $dark-color='$textDark200'
                color='$textLight700'
                fontWeight='$semibold'>Click to resend</Link.Text></Link>
              </Text>
              <HStack space='xs' alignItems='center'>
                <Button
                  variant='link'
                  size='sm'
                  onPress={() => {
                    setShowModal2(false);
                  }}
                >
                  <ButtonText >Back to login</ButtonText>
                </Button>
              </HStack>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={showModal3}
          onClose={() => {
            setShowModal3(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader borderBottomWidth='$0'>
            <VStack space='sm'>
              <Heading size='lg'>Set new password</Heading>
              <Text size='sm'>Almost done. Enter your new password and you are all set.</Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
            <VStack space='xl'>
              <Input>
                <InputField placeholder="New password" />
              </Input>
              <Input>
                <InputField placeholder="Confirm new password" />
              </Input>
              </VStack>
            </ModalBody>
            <ModalFooter borderTopWidth='$0'>
            <VStack space='lg' w='$full'>
              <Button
                onPress={() => {
                  setShowModal(false);
                  setShowModal2(false);
                  setShowModal3(false);
                }}
              >
                <ButtonText>Submit</ButtonText>
              </Button>
              <HStack space='xs' alignItems='center'>
                <Button
                  variant='link'
                  size='sm'
                  onPress={() => {
                    setShowModal3(false);
                  }}
                >
                  <ButtonText >Back to login</ButtonText>
                </Button>
              </HStack>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
});
export default ModalComp;
