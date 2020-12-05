import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, Image, Label, Divider, Icon, Header } from 'semantic-ui-react';
import ProfileEdit from '../components/ProfileEdit';

const ProfileScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);

  const [open, setOpen] = useState();

  const { loading, userInfo, error } = userLogin;

  return (
    <div className='profile-Container'>
      <div className='user'>
        <div className='profile'>
          <h1 className='profile__name'>{userInfo.name}</h1>
          <div className='profile__email'>{userInfo.email}</div>
          <div className='profile__edit'>
            <Modal
              closeIcon
              trigger={
                <Button animated basic>
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name='edit outline' />
                  </Button.Content>
                </Button>
              }
              content={<ProfileEdit />}
              actions={[{ key: 'save', content: 'Save', positive: true }]}
            />
          </div>
        </div>
        <div>
          <h1>Orders</h1>
          <p>2 Items</p>
        </div>
        <div className='order'>
          <Divider horizontal>
            <Header as='h4' floated='right'>
              <Label as='a' tag>
                $10.00
              </Label>
            </Header>
          </Divider>
          <div className='order__details'>
            <h2>Order# 123123213213</h2>
            <Link>
              View Order <Icon className='arrow right' color='green' />
            </Link>
          </div>
          <div className='order__shipping'>
            <p>
              <Label circular color='green' empty key='green' />
              Order placed on March 26, 2020
            </p>

            <p>
              <Label circular color='gray' empty key='gray' /> Preparing for shipment
            </p>
          </div>
          <div className='order__image'>
            <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
          </div>
        </div>
        <div className='order'>
          <Divider horizontal>
            <Header as='h4'>
              <Label as='a' tag>
                $10.00
              </Label>
            </Header>
          </Divider>
          <div className='order__details'>
            <h2>Order# 123123213213</h2>
            <Link>
              View Order <Icon className='arrow right' color='green' />
            </Link>
          </div>
          <div className='order__shipping'>
            <p>
              <Label circular color='green' empty key='green' />
              Order placed on March 26, 2020
            </p>

            <p>
              <Label circular color='gray' empty key='gray' /> Preparing for shipment
            </p>
          </div>
          <div className='order__image'>
            <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
