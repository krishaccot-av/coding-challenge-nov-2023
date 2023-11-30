'use client';
import Image from "next/image";
// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
export const ModalComp =({image, isOpen, toggle})=>{
    return (
        <Modal isOpen={isOpen} className={"container-fluid"} fullscreen>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            {image.title}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => toggle(!isOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody><Image className={"card-img-top"} src={image.url} alt={image.altText} width={1000} height={0} style={{width:"auto", height:"auto"}}></Image></ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => toggle(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

    )
}